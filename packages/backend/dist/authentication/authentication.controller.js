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
exports.AuthenticationController = void 0;
const openapi = require("@nestjs/swagger");
const authentication_service_1 = require("./authentication.service");
const jwtAccess_guard_1 = require("./guards/jwtAccess.guard");
const jwtRefresh_guard_1 = require("./guards/jwtRefresh.guard");
const localAuthentication_guard_1 = require("./guards/localAuthentication.guard");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AuthenticationController = class AuthenticationController {
    constructor(authenticationService, usersService) {
        this.authenticationService = authenticationService;
        this.usersService = usersService;
    }
    async register(registrationData, request) {
        const user = await this.authenticationService.register(registrationData);
        const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
        const jwtCookies = this.authenticationService.getLoginCookies(user.id);
        request.res.setHeader('Set-Cookie', jwtCookies);
        return user;
    }
    async logIn(request) {
        const { user } = request;
        const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
        const jwtCookies = this.authenticationService.getLoginCookies(user.id);
        request.res.setHeader('Set-Cookie', jwtCookies);
        return user;
    }
    async logOut(request) {
        await this.usersService.removeRefreshToken(request.user.id);
        request.res.setHeader('Set-Cookie', this.authenticationService.getLogoutCookies());
    }
    authenticate(request) {
        const user = request.user;
        return user;
    }
    refresh(request) {
        const accessTokenCookie = this.authenticationService.getJwtAccessTokenCookie(request.user.id);
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    }
};
__decorate([
    (0, common_1.Post)('register'),
    openapi.ApiResponse({ status: 201, type: require("../users/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(localAuthentication_guard_1.LocalAuthenticationGuard),
    (0, common_1.Post)('log-in'),
    openapi.ApiResponse({ status: 200, type: require("../users/entities/user.entity").User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logIn", null);
__decorate([
    (0, common_1.UseGuards)(jwtAccess_guard_1.JwtAccessGuard),
    (0, common_1.Post)('log-out'),
    (0, common_1.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logOut", null);
__decorate([
    (0, common_1.UseGuards)(jwtAccess_guard_1.JwtAccessGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("../users/entities/user.entity").User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "authenticate", null);
__decorate([
    (0, common_1.UseGuards)(jwtRefresh_guard_1.JwtRefreshGuard),
    (0, common_1.Get)('refresh'),
    openapi.ApiResponse({ status: 200, type: require("../users/entities/user.entity").User }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "refresh", null);
AuthenticationController = __decorate([
    (0, common_1.Controller)('authentication'),
    (0, swagger_1.ApiTags)('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        users_service_1.UsersService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map