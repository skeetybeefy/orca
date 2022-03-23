import { IUser } from "./IUser.interface";

export type IGroup = {
  id: number;
  name: string;
  description: string;
  membersIds: IUser["id"][];
  ownerId: IUser["id"];
};

export type ICreateGroupDto = Omit<IGroup, "id" | "ownerId">;

export type IUpdateGroupDto = Pick<IGroup, "id"> & Partial<ICreateGroupDto>;
