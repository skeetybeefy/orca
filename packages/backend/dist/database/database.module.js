"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const environmentVariable_enum_1 = require("../common/enums/environmentVariable.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get(environmentVariable_enum_1.EnvironmentVariable.POSTGRES_HOST),
                    port: configService.get(environmentVariable_enum_1.EnvironmentVariable.POSTGRES_PORT),
                    username: configService.get(environmentVariable_enum_1.EnvironmentVariable.POSTGRES_USER),
                    password: configService.get(environmentVariable_enum_1.EnvironmentVariable.POSTGRES_PASSWORD),
                    database: configService.get(environmentVariable_enum_1.EnvironmentVariable.POSTGRES_DB),
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true,
                }),
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map