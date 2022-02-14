import { File } from 'files/entities/file.entity';
import { UsersModule } from 'users/users.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([File]), UsersModule, ConfigModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
