import { Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/authentication/entities/tokenPayload.interface';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: TokenPayload): Promise<import("../../users/entities/user.entity").User>;
}
export {};
