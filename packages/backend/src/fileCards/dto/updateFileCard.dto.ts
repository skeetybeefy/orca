import { PartialType } from '@nestjs/swagger';
import { CreateFileCardDto } from 'fileCards/dto/createFileCard.dto';

export class UpdateFileCardDto extends PartialType(CreateFileCardDto) {}
