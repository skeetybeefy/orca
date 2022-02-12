import * as bcrypt from 'bcrypt';
import { Tokens } from 'src/authentication/entities/token.enum';
import { TokenPair } from 'src/authentication/entities/tokenPair.interface';
import { TokenPayload } from 'src/authentication/entities/tokenPayload.interface';
import { EnvironmentVariable } from 'src/common/enums/EnvironmentVariable.enum';
import { PostgresErrorCode } from 'src/common/enums/PostgresErrorCode.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with such credentials already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getJwtAccesToken(userId: User['id']) {
    const payload: TokenPayload = { userId };
    const expirationTime = this.configService.get(
      EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    );
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(
        EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET,
      ),
      expiresIn: `${expirationTime}s`,
    });
    return token;
  }

  public getJwtRefreshToken(userId: User['id']) {
    const payload: TokenPayload = { userId };
    const expirationTime = this.configService.get(
      EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(
        EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET,
      ),
      expiresIn: `${expirationTime}s`,
    });
    return token;
  }

  public getJwtTokenPair(userId: User['id']): TokenPair {
    const accessToken = this.getJwtAccesToken(userId);
    const refreshToken = this.getJwtRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  public getJwtAccessTokenCookie(userId: User['id']) {
    const accessToken = this.getJwtAccesToken(userId);
    const expirationTime = this.configService.get(
      EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    );
    return `${Tokens.Access}=${accessToken}; HttpOnly; Path=/; Max-Age:${expirationTime}`;
  }

  public getJwtRefreshTokenCookie(userId: User['id']) {
    const refreshToken = this.getJwtRefreshToken(userId);
    const expirationTime = this.configService.get(
      EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );
    return `${Tokens.Refresh}=${refreshToken}; HttpOnly; Path=/; Max-Age:${expirationTime}`;
  }

  public getLoginCookies(userId: User['id']) {
    const accesTokenCookie = this.getJwtAccessTokenCookie(userId);
    const refreshTokenCookie = this.getJwtRefreshTokenCookie(userId);
    return [accesTokenCookie, refreshTokenCookie];
  }

  public getLogoutCookies() {
    return [
      `${Tokens.Access}=; HttpOnly; Path=/; Max-Age=0`,
      `${Tokens.Refresh}=; HttpOnly; Path=/; Max-Age=0`,
    ];
  }
}
