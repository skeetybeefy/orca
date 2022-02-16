import { AuthorizationPolicyHandler } from 'authorization/entities/authorizationPolicyHandler';
import { MetadataKey } from 'common/enums/metadataKey';

import { SetMetadata } from '@nestjs/common';

export const CheckPolicies = (...handlers: AuthorizationPolicyHandler[]) =>
  SetMetadata(MetadataKey.CHECK_POLICY, handlers);
