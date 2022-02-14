import { FileCard } from 'fileCards/entities/fileСard.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'users/users.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateFileCardDto } from './dto/createFileCard.dto';
import { UpdateFileCardDto } from './dto/updateFileCard.dto';

@Injectable()
export class FileCardsService {
  constructor(
    @InjectRepository(FileCard) private groupsRepository: Repository<FileCard>,
    private readonly usersService: UsersService,
  ) {}
  create(createFileCardDto: CreateFileCardDto) {
    return 'This action adds a new fileCard';
  }

  findAll() {
    return `This action returns all fileCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileCard`;
  }

  update(id: number, updateFileCardDto: UpdateFileCardDto) {
    return `This action updates a #${id} fileCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileCard`;
  }
}
