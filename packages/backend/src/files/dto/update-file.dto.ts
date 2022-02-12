import { CreateFileDto } from 'src/files/dto/create-file.dto';

import { PartialType } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {}
