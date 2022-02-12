import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FileCategory } from 'src/files/entities/fileCategory.enum';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(FileCategory)
  category: FileCategory;

  @IsNumber(null, { each: true })
  allowedGroups: number[];

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
