import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "users/dto/createUser.dto";
import { UpdateUserDto } from "users/dto/updateUser.dto";
import { User } from "users/entities/user.entity";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create({ ...createUserDto }: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  getAll() {
    return this.usersRepository.find();
  }

  async getByIds(ids: User["id"][]) {
    return await this.usersRepository.findByIds(ids);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async getById(id: User["id"]) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async update(id: User["id"], updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ id });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async remove(id: User["id"]) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: User["id"]) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      hashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: User["id"]) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: User["id"]) {
    return this.usersRepository.update(userId, {
      hashedRefreshToken: null,
    });
  }
}
