import { AuthorizationAbilitiesFactory } from 'src/authorization/authorizationAbilities.factory';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class AuthorizationPoliciesGuard implements CanActivate {
    private reflector;
    private authorizationAbilitiesFactory;
    constructor(reflector: Reflector, authorizationAbilitiesFactory: AuthorizationAbilitiesFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private execPolicyHandler;
}
