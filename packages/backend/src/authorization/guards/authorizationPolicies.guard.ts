import {
  AppAbility,
  AuthorizationAbilitiesFactory,
} from 'src/authorization/authorizationAbilities.factory';
import { AuthorizationPolicyHandler } from 'src/authorization/entities/authorizationPolicyHandler';
import { MetadataKey } from 'src/common/enums/metadataKey.enum';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationAbilitiesFactory: AuthorizationAbilitiesFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePolicyHandlers =
      this.reflector.get<AuthorizationPolicyHandler[]>(
        MetadataKey.CHECK_POLICY,
        context.getHandler(),
      ) || [];

    const controllerPolicyHandlers =
      this.reflector.get<AuthorizationPolicyHandler[]>(
        MetadataKey.CHECK_POLICY,
        context.getClass(),
      ) || [];

    const policyHandlers = [
      ...controllerPolicyHandlers,
      ...routePolicyHandlers,
    ];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.authorizationAbilitiesFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(
    handler: AuthorizationPolicyHandler,
    ability: AppAbility,
  ) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
