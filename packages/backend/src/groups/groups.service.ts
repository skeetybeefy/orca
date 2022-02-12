import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { UpdateGroupDto } from 'src/groups/dto/update-group.dto';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const newGroup = await this.groupsRepository.create(createGroupDto);
    await this.groupsRepository.save(newGroup);
    return newGroup;
  }

  getAll() {
    return this.groupsRepository.find();
  }

  async getById(id: Group['id']) {
    const group = await this.groupsRepository.findOne({ id });
    if (group) {
      return group;
    }
    throw new NotFoundException('Group not found');
  }

  async update(id: Group['id'], updateGroupDto: UpdateGroupDto) {
    await this.groupsRepository.update(id, updateGroupDto);
    const updatedGroup = await this.groupsRepository.findOne({ id });
    if (updatedGroup) {
      return updatedGroup;
    }
    throw new NotFoundException('Group not found');
  }

  async remove(id: Group['id']) {
    const deleteResponse = await this.groupsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('Group not found');
    }
  }
}
