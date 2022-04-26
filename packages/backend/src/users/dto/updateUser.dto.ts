import { CreateUserDto } from 'users/dto/createUser.dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
