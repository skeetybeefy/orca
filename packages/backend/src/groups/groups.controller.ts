import { JwtAccessGuard } from 'authentication/guards/jwtAccess.guard';
import { CreateGroupDto } from 'groups/dto/createGroup.dto';
import { UpdateGroupDto } from 'groups/dto/updateGroup.dto';
import { GroupsService } from 'groups/groups.service';
import { ApiRoute } from 'monotypes/ApiRoute.enum';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'authentication/entities/requestWithUser.interface';

@ApiTags(ApiRoute.Groups)
@Controller(ApiRoute.Groups)
@UseGuards(JwtAccessGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(
    @Body() createGroupDto: CreateGroupDto,
    @Req() request: RequestWithUser,
  ) {
    const {
      user: { id: ownerId },
    } = request;
    return this.groupsService.create({ ...createGroupDto, ownerId });
  }

  @Get()
  findAll() {
    return this.groupsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
