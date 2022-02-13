import { AuthorizationPolicyHandler } from 'src/authorization/entities/authorizationPolicyHandler';
import { MetadataKey } from 'src/common/enums/metadataKey.enum';
export declare const CheckPolicies: (...handlers: AuthorizationPolicyHandler[]) => import("@nestjs/common").CustomDecorator<MetadataKey>;
