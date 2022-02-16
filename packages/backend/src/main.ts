import { AppModule } from 'app.module';
import { EnvironmentVariable } from 'common/enums/environmentVariable';
import * as cookieParser from 'cookie-parser';
// import * as fs from 'fs';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('/Users/buktp/Documents/certs/localhost-key.pem'),
  //   cert: fs.readFileSync('/Users/buktp/Documents/certs/localhost.pem'),
  // };
  // const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Orca API')
    .setDescription('ORCA API description')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  const config = app.get(ConfigService);
  const port = config.get(EnvironmentVariable.PORT);

  // app.enableCors({
  //   // origin: 'http://localhost',
  //   credentials: true,
  // });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));

  await app.listen(port);
}
bootstrap();
