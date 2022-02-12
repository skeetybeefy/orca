import { CreateGroupDto } from 'src/groups/dto/create-group.dto';

import { PartialType } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
