import { CreateUserDto } from 'users/dto/createUser.dto';

import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
