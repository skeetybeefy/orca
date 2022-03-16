import { FileCard } from 'fileCards/entities/fileCard.entity';
import { UsersModule } from 'users/users.module';
import { GroupsModule } from 'groups/groups.module';
import { FilesModule } from 'files/files.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileCardsController } from './fileCards.controller';
import { FileCardsService } from './fileCards.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileCard]), UsersModule, GroupsModule, FilesModule],
  controllers: [FileCardsController],
  providers: [FileCardsService],
})
export class FileCardsModule { }
