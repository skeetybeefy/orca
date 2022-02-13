"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const environmentVariable_enum_1 = require("./common/enums/environmentVariable.enum");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use(cookieParser());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Orca API')
        .setDescription('ORCA API description')
        .setVersion('1.0')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    const config = app.get(config_1.ConfigService);
    const port = config.get(environmentVariable_enum_1.EnvironmentVariable.PORT);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map