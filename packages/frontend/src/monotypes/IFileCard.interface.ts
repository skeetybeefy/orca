import { FileCategory } from 'monotypes/FileCategory.enum';
import { IFile } from 'monotypes/IFile.interface';
import { IGroup } from 'monotypes/IGroup.interface';
import { IUser } from 'monotypes/IUser.interface';

export type IFileCard = {
  id: number;
  name: string;
  description?: string;
  category: FileCategory;
  ownerId: IUser['id'];
  allowedGroupsIds: IGroup['id'][];
  fileId: IFile['id'];
};

export type ICreateFileCardDto = Omit<IFileCard, 'id' | 'ownerId'>;

export type IUpdateFileCardDto = Pick<IFileCard, 'id'> &
  Partial<ICreateFileCardDto>;
