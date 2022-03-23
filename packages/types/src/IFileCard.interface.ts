import { FileCategory } from "./FileCategory.enum";
import { IFile } from "./IFile.interface";
import { IGroup } from "./IGroup.interface";
import { IUser } from "./IUser.interface";

export type IFileCard = {
  id: number;
  name: string;
  description?: string;
  category: FileCategory;
  ownerId: IUser["id"];
  allowedGroupsIds: IGroup["id"][];
  fileId: IFile["id"];
};

export type ICreateFileCardDto = Omit<IFileCard, "id" | "ownerId">;

export type IUpdateFileCardDto = Pick<IFileCard, "id"> &
  Partial<ICreateFileCardDto>;
