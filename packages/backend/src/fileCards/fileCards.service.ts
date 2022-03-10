import { CreateFileCardDto } from './dto/createFileCard.dto';
import { UpdateFileCardDto } from './dto/updateFileCard.dto';
import { FileCard } from 'fileCards/entities/fileCard.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'groups/groups.service';
import { FilesService } from 'files/files.service';
import { UsersService } from 'users/users.service';
import { User } from 'users/entities/user.entity';

import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { } from 'groups/groups.module'




@Injectable()
export class FileCardsService {
  constructor(
    @InjectRepository(FileCard) private groupsRepository: Repository<FileCard>,
    private readonly groupsService: GroupsService,
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
  ) { }

  async create({
    ownerId,
    fileId,
    allowedGroupsIds,
    ...crateFileCardDto
  }: CreateFileCardDto & { ownerId: User['id'] }) {
    const owner = await this.usersService.getById(ownerId);
    const file = await this.filesService.getById(fileId);
    const allowedGroups = await this.groupsService.getByIds(allowedGroupsIds)
    const newFileCard = await this.groupsRepository.create({
      ...crateFileCardDto,
      owner,
      file,
      allowedGroups,
    });
    await this.groupsRepository.save(newFileCard)
    return newFileCard
  }

  findAll() {
    return this.groupsRepository.find();
  }

  async findOne(id: FileCard['id']) {
    const filecard = await this.groupsRepository.findOne({ id });
    if (filecard) {
      return filecard;
    }
    throw new NotFoundException(`Filecard #${id} not found`);
  }

  async update(
    id: FileCard['id'],
    { allowedGroupsIds, description, fileId, category, ...updateFileCardDto }: UpdateFileCardDto
  ) {
    const filecard = await this.groupsRepository.findOne({ id });
    if (!filecard) {
      throw new NotFoundException('Group not found');
    }

    const groups = await this.groupsService.getByIds(allowedGroupsIds);
    filecard.allowedGroups = groups;
    filecard.description = description;
    filecard.category = category;
    filecard.file = await this.filesService.getById(fileId);
    await this.groupsRepository.save(filecard);

    await this.groupsRepository.update(id, updateFileCardDto);

    const updatedfileCard = await this.groupsRepository.findOne({ id });
    if (updatedfileCard) {
      return updatedfileCard;
    }
    throw new NotFoundException('FileCard not found');
  }

  async remove(id: FileCard['id']) {
    const deleteResponse = await this.groupsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Group #${id} not found`);
    }
  }
}
