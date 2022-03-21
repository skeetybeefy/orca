import { AuthenticationModule } from 'authentication/authentication.module';
import { AuthorizationModule } from 'authorization/authorization.module';
import { EnvironmentVariable } from 'common/enums/environmentVariable';
import { DatabaseModule } from 'database/database.module';
import { FileCardsModule } from 'fileCards/fileCards.module';
import { FilesModule } from 'files/files.module';
import { GroupsModule } from 'groups/groups.module';
import { TestModule } from 'test/test.module';
import { UsersModule } from 'users/users.module';

import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
        [EnvironmentVariable.BACKEND_PORT]: Joi.number(),
        [EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
        [EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME]:
          Joi.string().required(),
        [EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
        [EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME]:
          Joi.string().required(),
        [EnvironmentVariable.UPLOADED_FILES_DESTINATION]:
          Joi.string().required(),
      }),
    }),
    DatabaseModule,
    FilesModule,
    GroupsModule,
    UsersModule,
    AuthorizationModule,
    TestModule,
    FileCardsModule,
  ],
})
export class AppModule {}
