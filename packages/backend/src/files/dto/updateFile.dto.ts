import { CreateFileDto } from "files/dto/createFile.dto";

import { PartialType } from "@nestjs/swagger";

export class UpdateFileDto extends PartialType(CreateFileDto) {}
