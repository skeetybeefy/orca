import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'authentication/entities/tokenPayload.interface';
import { EnvironmentVariable } from 'common/enums/environmentVariable.enum';
import { Tokens } from 'authentication/entities/token.enum';
import { UsersService } from 'users/users.service';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[Tokens.Access];
        },
      ]),
      secretOrKey: configService.get(
        EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET,
      ),
    });
  }

  async validate(payload: TokenPayload) {
    return this.usersService.getById(payload.userId);
  }
}
