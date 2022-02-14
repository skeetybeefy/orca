import { CreateGroupDto } from 'groups/dto/createGroup.dto';
import { UpdateGroupDto } from 'groups/dto/updateGroup.dto';
import { Group } from 'groups/entities/group.entity';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
  ) {}

  async create({
    ownerId,
    membersIds,
    ...createGroupDto
  }: CreateGroupDto & { ownerId: User['id'] }) {
    const owner = await this.usersService.getById(ownerId);
    const members = await this.usersService.getByIds(membersIds);
    const newGroup = await this.groupsRepository.create({
      ...createGroupDto,
      owner,
      members,
    });
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

  async update(
    id: Group['id'],
    { membersIds, ...updateGroupDto }: UpdateGroupDto,
  ) {
    // TypeOrm doesn't allow updating ManyToMany relationships
    // First we must save the members and then update other props
    const group = await this.groupsRepository.findOne({ id });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const members = await this.usersService.getByIds(membersIds);
    group.members = members;
    await this.groupsRepository.save(group);

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
