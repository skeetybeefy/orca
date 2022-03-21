import { CreateGroupDto } from 'groups/dto/createGroup.dto';

import { PartialType } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
