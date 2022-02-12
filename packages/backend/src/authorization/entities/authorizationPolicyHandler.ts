import { AppAbility } from 'src/authorization/authorizationAbilities.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type AuthorizationPolicyHandler = IPolicyHandler | PolicyHandlerCallback;
