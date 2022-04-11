import { RequestWithUser } from "authentication/entities/requestWithUser.interface";
import { JwtAccessGuard } from "authentication/guards/jwtAccess.guard";
import { File } from "files/entities/file.entity";
import { FilesService } from "files/files.service";
import { LocalFilesInterceptor } from "files/localFiles.interceptor";
import { createReadStream } from "fs";
import { join } from "path";

import {
  Body,
    Controller, Delete, Get, Param, Post, Req, StreamableFile, UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiRoute } from "@orca/types";

@ApiTags(ApiRoute.Files)
@Controller(ApiRoute.Files)
@UseGuards(JwtAccessGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/files',
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: RequestWithUser,
  ) {
    const {
      user: { id: ownerId },
    } = request;
    return this.filesService.create({ file, ownerId });
  }

  @Get()
  findAll(@Req() request: RequestWithUser) {
    const {
      user: { id: ownerId },
    } = request;
    return this.filesService.findAll(ownerId);
  }

  @Get(':id')
  async getById(@Param('id') id: File['id'], @Req() request: RequestWithUser) {
    const file = await this.filesService.getById(id);
    const path = join(process.cwd(), file.path);
    console.log({ path });
    const stream = createReadStream(path);

    request.res.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }

  @Delete(':id')
  remove(@Param('id') id: File['id']) {
    return this.filesService.remove(id);
  }

  @Delete()
  removeBulk(@Body() ids: ReadonlyArray<File["id"]>) {
    return this.filesService.removeBulk(ids)
  }
}
