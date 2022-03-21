import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ICreateGroupDto } from 'monotypes/IGroup.interface';
import { IUser } from 'monotypes/IUser.interface';

export class CreateGroupDto implements ICreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber({}, { each: true })
  membersIds: IUser['id'][];
}
