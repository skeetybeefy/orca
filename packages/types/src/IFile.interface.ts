import { IUser } from "./IUser.interface";

export interface IFile {
  id: number;
  originalname: string;
  filename: string;
  path: string;
  mimetype: string;
  ownerId: IUser["id"];
}