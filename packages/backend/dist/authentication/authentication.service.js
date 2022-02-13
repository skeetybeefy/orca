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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const bcrypt = require("bcrypt");
const token_enum_1 = require("./entities/token.enum");
const EnvironmentVariable_enum_1 = require("../common/enums/EnvironmentVariable.enum");
const PostgresErrorCode_enum_1 = require("../common/enums/PostgresErrorCode.enum");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registrationData) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.create(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }));
            return createdUser;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === PostgresErrorCode_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('User with such credentials already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAuthenticatedUser(email, plainTextPassword) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getJwtAccesToken(userId) {
        const payload = { userId };
        const expirationTime = this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME);
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET),
            expiresIn: `${expirationTime}s`,
        });
        return token;
    }
    getJwtRefreshToken(userId) {
        const payload = { userId };
        const expirationTime = this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME);
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET),
            expiresIn: `${expirationTime}s`,
        });
        return token;
    }
    getJwtTokenPair(userId) {
        const accessToken = this.getJwtAccesToken(userId);
        const refreshToken = this.getJwtRefreshToken(userId);
        return { accessToken, refreshToken };
    }
    getJwtAccessTokenCookie(userId) {
        const accessToken = this.getJwtAccesToken(userId);
        const expirationTime = this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME);
        return `${token_enum_1.Tokens.Access}=${accessToken}; HttpOnly; Path=/; Max-Age:${expirationTime}`;
    }
    getJwtRefreshTokenCookie(userId) {
        const refreshToken = this.getJwtRefreshToken(userId);
        const expirationTime = this.configService.get(EnvironmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME);
        return `${token_enum_1.Tokens.Refresh}=${refreshToken}; HttpOnly; Path=/; Max-Age:${expirationTime}`;
    }
    getLoginCookies(userId) {
        const accesTokenCookie = this.getJwtAccessTokenCookie(userId);
        const refreshTokenCookie = this.getJwtRefreshTokenCookie(userId);
        return [accesTokenCookie, refreshTokenCookie];
    }
    getLogoutCookies() {
        return [
            `${token_enum_1.Tokens.Access}=; HttpOnly; Path=/; Max-Age=0`,
            `${token_enum_1.Tokens.Refresh}=; HttpOnly; Path=/; Max-Age=0`,
        ];
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map