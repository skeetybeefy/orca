import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FileCategory } from 'monotypes/FileCategory.enum';
import { IFile } from 'monotypes/IFile.interface';
import { ICreateFileCardDto } from 'monotypes/IFileCard.interface';

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
  allowedGroupsIds: number[];

  @IsNumber()
  fileId: IFile['id'];
}
