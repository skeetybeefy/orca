import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { FileCategory, ICreateFileCardDto, IFile, IGroup } from "@orca/types";

export class CreateFileCardDto implements ICreateFileCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(FileCategory)
  category: FileCategory;

  @IsNumber({}, { each: true })
  allowedGroupsIds: IGroup['id'][];

  @IsNumber()
  fileId: IFile['id'];
}
