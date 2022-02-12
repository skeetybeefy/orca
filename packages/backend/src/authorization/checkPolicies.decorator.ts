import { AuthorizationPolicyHandler } from 'src/authorization/entities/authorizationPolicyHandler';
import { MetadataKey } from 'src/common/enums/metadataKey.enum';

import { SetMetadata } from '@nestjs/common';

export const CheckPolicies = (...handlers: AuthorizationPolicyHandler[]) =>
  SetMetadata(MetadataKey.CHECK_POLICY, handlers);
