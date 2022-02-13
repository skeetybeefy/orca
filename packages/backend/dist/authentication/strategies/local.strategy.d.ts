import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { User } from 'src/users/entities/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    validate(email: string, password: string): Promise<User>;
}
export {};
