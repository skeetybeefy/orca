import { File } from 'files/entities/file.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'users/users.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';

type CreateFileProps = {
  ownerId: User['id'];
  file: Express.Multer.File;
};
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private filesRepository: Repository<File>,
    private readonly usersService: UsersService,
  ) {}
  async create({ file, ownerId }: CreateFileProps) {
    const owner = await this.usersService.getById(ownerId);
    if (!owner) {
      throw new NotFoundException('User not found');
    }

    const newFile = await this.filesRepository.create({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      originalname: file.originalname,
      owner,
    });
    await this.filesRepository.save(newFile);

    return newFile;
  }

  async getById(fileId: File['id']) {
    const file = await this.filesRepository.findOne(fileId);
    if (file) {
      return file;
    }
    throw new NotFoundException('File not found');
  }

  async findAll(ownerId: User['id']) {
    const owner = await this.usersService.getById(ownerId);
    const files = await this.filesRepository.find({ owner });
    return files;
  }

  async remove(id: File['id']) {
    const deleteResponse = await this.filesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('File not found');
    }
    return id;
  }
}
