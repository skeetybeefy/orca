import { RequestWithUser } from "authentication/entities/requestWithUser.interface";
import { JwtAccessGuard } from "authentication/guards/jwtAccess.guard";
import { CreateFileCardDto } from "fileCards/dto/createFileCard.dto";
import { UpdateFileCardDto } from "fileCards/dto/updateFileCard.dto";
import { FileCardsService } from "fileCards/fileCards.service";

import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiRoute } from "@orca/types";

@ApiTags(ApiRoute.FileCards)
@Controller(ApiRoute.FileCards)
@UseGuards(JwtAccessGuard)
export class FileCardsController {
  constructor(private readonly fileCardsService: FileCardsService) { }

  @Post()
  create(
    @Body() createFileCardDto: CreateFileCardDto,
    @Req() request: RequestWithUser,
  ) {
    const {
      user: { id: ownerId },
    } = request;
    return this.fileCardsService.create({ ...createFileCardDto, ownerId });
  }

  @Get()
  findAll() {
    return this.fileCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileCardsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileCardDto: UpdateFileCardDto,
  ) {
    return this.fileCardsService.update(+id, updateFileCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileCardsService.remove(+id);
  }
}
