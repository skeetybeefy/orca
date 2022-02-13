import { AuthenticationService } from 'src/authentication/authentication.service';
import { RequestWithUser } from 'src/authentication/entities/requestWithUser.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthenticationController {
    private readonly authenticationService;
    private readonly usersService;
    constructor(authenticationService: AuthenticationService, usersService: UsersService);
    register(registrationData: CreateUserDto, request: RequestWithUser): Promise<import("../users/entities/user.entity").User>;
    logIn(request: RequestWithUser): Promise<import("../users/entities/user.entity").User>;
    logOut(request: RequestWithUser): Promise<void>;
    authenticate(request: RequestWithUser): import("../users/entities/user.entity").User;
    refresh(request: RequestWithUser): import("../users/entities/user.entity").User;
}
