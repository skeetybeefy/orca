import { JwtAccessGuard } from "authentication/guards/jwtAccess.guard";
import { CreateUserDto } from "users/dto/createUser.dto";
import { UpdateUserDto } from "users/dto/updateUser.dto";
import { UsersService } from "users/users.service";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiRoute } from "@orca/types";

@ApiTags(ApiRoute.Users)
@Controller(ApiRoute.Users)
@UseGuards(JwtAccessGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.getById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log({ id, updateUserDto });
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
