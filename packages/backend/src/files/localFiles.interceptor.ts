import { diskStorage } from "multer";

import { Injectable, mixin, NestInterceptor, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { EnvironmentVariable } from "common/enums/environmentVariable";

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}
export function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(configService: ConfigService) {
      const filesDestination = configService.get(
        EnvironmentVariable.UPLOADED_FILES_DESTINATION
      );

      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions
      ))();
    }

    intercept(...args: Parameters<NestInterceptor["intercept"]>) {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}
