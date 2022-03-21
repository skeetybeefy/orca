import { IUser } from "monotypes/IUser.interface";

export interface IFile {
  id: number;
  filename: string;
  path: string;
  mimetype: string;
  originalname: string;
  ownerId: IUser["id"];
}
