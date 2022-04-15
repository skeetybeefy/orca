import { RequestWithUser } from "authentication/entities/requestWithUser.interface";
import { JwtAccessGuard } from "authentication/guards/jwtAccess.guard";
import { File } from "files/entities/file.entity";
import { FilesService } from "files/files.service";
import { createReadStream } from "fs";
import { join } from "path";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiRoute } from "@orca/types";
import { CreateFileDto } from "files/dto/createFile.dto";

@ApiTags(ApiRoute.Files)
@Controller(ApiRoute.Files)
@UseGuards(JwtAccessGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Req() request: RequestWithUser, @Body() file: CreateFileDto) {
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

  @Get(":id")
  async getById(@Param("id") id: File["id"]) {
    const file = await this.filesService.getById(id);
    return file;
  }

  @Delete(":id")
  remove(@Param("id") id: File["id"]) {
    return this.filesService.remove(id);
  }

  @Delete()
  removeBulk(@Body() ids: ReadonlyArray<File["id"]>) {
    return this.filesService.removeBulk(ids);
  }
}
