import { CreateFileCardDto } from 'fileCards/dto/createFileCard.dto';
import { UpdateFileCardDto } from 'fileCards/dto/updateFileCard.dto';
import { FileCardsService } from 'fileCards/fileCards.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('file-cards')
export class FileCardsController {
  constructor(private readonly fileCardsService: FileCardsService) {}

  @Post()
  create(@Body() createFileCardDto: CreateFileCardDto) {
    return this.fileCardsService.create(createFileCardDto);
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
