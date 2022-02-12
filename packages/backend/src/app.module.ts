import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { EnvironmentVariable } from 'src/common/enums/environmentVariable.enum';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';

import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TestModule } from './test/test.module';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        [EnvironmentVariable.POSTGRES_HOST]: Joi.string().required(),
        [EnvironmentVariable.POSTGRES_PORT]: Joi.string().required(),
        [EnvironmentVariable.POSTGRES_USER]: Joi.string().required(),
        [EnvironmentVariable.POSTGRES_PASSWORD]: Joi.string().required(),
        [EnvironmentVariable.POSTGRES_DB]: Joi.string().required(),
        [EnvironmentVariable.PORT]: Joi.number(),
        [EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
        [EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME]:
          Joi.string().required(),
        [EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
        [EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME]:
          Joi.string().required(),
      }),
    }),
    DatabaseModule,
    FilesModule,
    GroupsModule,
    UsersModule,
    AuthorizationModule,
    TestModule,
  ],
})
export class AppModule {}
