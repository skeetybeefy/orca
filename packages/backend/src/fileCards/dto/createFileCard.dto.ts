import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

import { FileCategory } from 'monotypes/FileCategory.enum';
import { IFile } from 'monotypes/IFile.interface';
import { ICreateFileCardDto } from 'monotypes/IFileCard.interface';
import { IGroup } from 'monotypes/IGroup.interface';

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
