import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { EnvironmentVariable } from 'src/common/enums/environmentVariable.enum';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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

  app.enableCors();

  await app.listen(port);
}
bootstrap();
