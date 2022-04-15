import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from "class-validator";
import { Role } from "users/entities/role.enum";

import { ICreateUserDto } from "@orca/types";

export class CreateUserDto implements ICreateUserDto {
  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MaxLength(50)
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsString()
  @MaxLength(50)
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  addressRegion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  addressSettlement: string;

  @IsString()
  @IsNotEmpty()
  addressLocation: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  diplomaNumberLetterPart: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  diplomaNumberNumericPart: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsString()
  @IsNotEmpty()
  qualification: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsString()
  @IsNotEmpty()
  specification: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsString()
  @IsNotEmpty()
  medicalFacility: string;
}
