import { CreateUserDto } from 'users/dto/createUser.dto';

import { PickType } from '@nestjs/swagger';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
