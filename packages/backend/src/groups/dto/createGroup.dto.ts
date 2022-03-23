import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ICreateGroupDto, IUser } from "@orca/types";

export class CreateGroupDto implements ICreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber({}, { each: true })
  membersIds: IUser['id'][];
}
