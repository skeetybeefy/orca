import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { FileCategory, ICreateFileDto, IGroup } from "@orca/types";

export class CreateFileDto implements ICreateFileDto {
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsEnum(FileCategory)
  category: FileCategory;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { each: true })
  allowedGroupsIds: IGroup["id"][];
}
