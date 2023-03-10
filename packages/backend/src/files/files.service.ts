import { File } from "files/entities/file.entity";
import { Repository } from "typeorm";
import { UsersService } from "users/users.service";

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "users/entities/user.entity";
import { GroupsService } from "groups/groups.service";
import { CreateFileDto } from "files/dto/createFile.dto";

export type CreateFileInfo = Omit<File, "id" | "owner" | "allowedGroups">;

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private filesRepository: Repository<File>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {}
  async create({ ownerId, allowedGroupsIds, ...file }: CreateFileInfo) {
    const owner = await this.usersService.getById(ownerId);
    const allowedGroups = await this.groupsService.getByIds(allowedGroupsIds);
    if (!owner) {
      throw new NotFoundException("User not found");
    }

    const newFile = await this.filesRepository.create({
      ...file,
      allowedGroups,
      owner,
    });
    await this.filesRepository.save(newFile);
    return newFile;
  }

  async getById(fileId: File["id"]) {
    const file = await this.filesRepository.findOne(fileId);
    if (file) {
      return file;
    }
    throw new NotFoundException("File not found");
  }

  async findAll(ownerId: User["id"]) {
    const owner = await this.usersService.getById(ownerId);
    const files = await this.filesRepository.find({ owner });
    return files;
  }

  async remove(id: File["id"]) {
    const deleteResponse = await this.filesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException("File not found");
    }
    return id;
  }

  async removeBulk(ids: ReadonlyArray<File["id"]>) {
    const deleteResponse = await this.filesRepository.delete(ids as number[]);
    if (deleteResponse.affected !== ids.length) {
      // TODO switch to transactions
      // because we need to see which files didnt change
    } else return ids;
  }
}
