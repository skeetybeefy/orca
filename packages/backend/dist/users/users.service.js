"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }
    getAll() {
        return this.usersRepository.find();
    }
    async getByEmail(email) {
        const user = await this.usersRepository.findOne({ email });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async getById(id) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        const updatedUser = await this.usersRepository.findOne({ id });
        if (updatedUser) {
            return updatedUser;
        }
        throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
    }
    async remove(id) {
        const deleteResponse = await this.usersRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async setCurrentRefreshToken(refreshToken, userId) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersRepository.update(userId, {
            hashedRefreshToken,
        });
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        const user = await this.getById(userId);
        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (isRefreshTokenMatching) {
            return user;
        }
    }
    async removeRefreshToken(userId) {
        return this.usersRepository.update(userId, {
            hashedRefreshToken: null,
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map