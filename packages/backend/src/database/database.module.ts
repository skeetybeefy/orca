import { EnvironmentVariable } from 'common/enums/environmentVariable.enum';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnvironmentVariable.POSTGRES_HOST),
        port: configService.get(EnvironmentVariable.POSTGRES_PORT),
        username: configService.get(EnvironmentVariable.POSTGRES_USER),
        password: configService.get(EnvironmentVariable.POSTGRES_PASSWORD),
        database: configService.get(EnvironmentVariable.POSTGRES_DB),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
