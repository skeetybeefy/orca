"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const authentication_module_1 = require("./authentication/authentication.module");
const authorization_module_1 = require("./authorization/authorization.module");
const environmentVariable_enum_1 = require("./common/enums/environmentVariable.enum");
const database_module_1 = require("./database/database.module");
const files_module_1 = require("./files/files.module");
const groups_module_1 = require("./groups/groups.module");
const users_module_1 = require("./users/users.module");
const Joi = require("@hapi/joi");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const test_module_1 = require("./test/test.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authentication_module_1.AuthenticationModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    [environmentVariable_enum_1.EnvironmentVariable.POSTGRES_HOST]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.POSTGRES_PORT]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.POSTGRES_USER]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.POSTGRES_PASSWORD]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.POSTGRES_DB]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.PORT]: Joi.number(),
                    [environmentVariable_enum_1.EnvironmentVariable.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.JWT_ACCESS_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
                    [environmentVariable_enum_1.EnvironmentVariable.JWT_REFRESH_TOKEN_EXPIRATION_TIME]: Joi.string().required(),
                }),
            }),
            database_module_1.DatabaseModule,
            files_module_1.FilesModule,
            groups_module_1.GroupsModule,
            users_module_1.UsersModule,
            authorization_module_1.AuthorizationModule,
            test_module_1.TestModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map