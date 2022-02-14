import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ICreateUserDto } from 'monotypes/IUser.interface';
import { Role } from 'users/entities/role.enum';

export class CreateUserDto implements ICreateUserDto {
  @IsEnum(Role)
  role: Role;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  addressRegion: string;

  @IsString()
  @IsNotEmpty()
  addressSettlement: string;

  @IsString()
  @IsNotEmpty()
  addressLocation: string;

  @ValidateIf((o) => o.role === Role.Doctor)
  @IsNumberString()
  @IsNotEmpty()
  diplomaNumber: string;

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
