import { AppModule } from "app.module";
import { EnvironmentVariable } from "common/enums/environmentVariable";
import * as cookieParser from "cookie-parser";
import * as express from "express";

import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Orca API")
    .setDescription("ORCA API description")
    .setVersion("1.0")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, swaggerDocument);

  const config = app.get(ConfigService);
  const port = config.get(EnvironmentVariable.BACKEND_PORT);
  // const frontendOrigin = config.get(EnvironmentVariable.FRONTEND_ORIGIN);

  // app.enableCors({
  //   origin: frontendOrigin,
  //   credentials: true,
  // });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));

  await app.listen(port);
}
bootstrap();
