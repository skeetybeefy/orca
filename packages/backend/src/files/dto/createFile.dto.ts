import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { FileCategory, ICreateFileDto, IGroup } from "@orca/types";
import { Transform } from "class-transformer";

export class CreateFileDto implements ICreateFileDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsEnum(FileCategory)
  category: FileCategory;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    return value.split(",").map((str) => Number.parseInt(str));
  })
  allowedGroupsIds: IGroup["id"][];
}
