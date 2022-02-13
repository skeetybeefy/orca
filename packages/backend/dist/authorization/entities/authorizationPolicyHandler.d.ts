import { AppAbility } from 'src/authorization/authorizationAbilities.factory';
interface IPolicyHandler {
    handle(ability: AppAbility): boolean;
}
declare type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export declare type AuthorizationPolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export {};
