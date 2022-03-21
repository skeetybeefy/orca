import { AuthorizationAbilitiesFactory } from 'authorization/authorizationAbilities.factory';

import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [AuthorizationAbilitiesFactory],
  exports: [AuthorizationAbilitiesFactory],
})
export class AuthorizationModule {}
