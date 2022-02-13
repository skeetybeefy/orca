import { TokenPair } from 'src/authentication/entities/tokenPair.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: CreateUserDto): Promise<User>;
    private verifyPassword;
    getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User>;
    getJwtAccesToken(userId: User['id']): string;
    getJwtRefreshToken(userId: User['id']): string;
    getJwtTokenPair(userId: User['id']): TokenPair;
    getJwtAccessTokenCookie(userId: User['id']): string;
    getJwtRefreshTokenCookie(userId: User['id']): string;
    getLoginCookies(userId: User['id']): string[];
    getLogoutCookies(): string[];
}
