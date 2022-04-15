import { FileCategory } from "./FileCategory.enum";
import { IGroup } from "./IGroup.interface";
import { IUser } from "./IUser.interface";

export interface IFile {
  id: number;
  originalname: string;
  filename: string;
  path: string;
  mimetype: string;
  ownerId: IUser["id"];
  category: FileCategory;
  description?: string;
  allowedGroupsIds: IGroup["id"][];
}

export type ISubmitFileDto = Pick<
  IFile,
  "filename" | "category" | "allowedGroupsIds" | "description"
>;

export type ICreateFileDto = Omit<IFile, "id" | "ownerId">;

export type IUpdateFileDto = Pick<IFile, "id"> & Partial<ICreateFileDto>;
