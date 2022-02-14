import { FileCard } from 'fileCards/entities/fileСard.entity';
import { UsersModule } from 'users/users.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileCardsController } from './fileCards.controller';
import { FileCardsService } from './fileCards.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileCard]), UsersModule],
  controllers: [FileCardsController],
  providers: [FileCardsService],
})
export class FileCardsModule {}
