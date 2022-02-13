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
exports.JwtRefreshStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const environmentVariable_enum_1 = require("../../common/enums/environmentVariable.enum");
const users_service_1 = require("../../users/users.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
                },
            ]),
            secretOrKey: configService.get(environmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    async validate(request, payload) {
        var _a;
        const refreshToken = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
        return this.usersService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
    }
};
JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], JwtRefreshStrategy);
exports.JwtRefreshStrategy = JwtRefreshStrategy;
//# sourceMappingURL=jwtRefresh.strategy.js.map