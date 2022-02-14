import { Category } from "types/Category.enum";

export type FileCard = {
  id: number;
  name: string;
  description?: string;
  category: Category;
  allowedGroups: number[];
  url: string;
};

export type CreateFileCardDto = Omit<FileCard, "id">;

export type UpdateGroupDto = Pick<FileCard, "id"> & Partial<CreateFileCardDto>;
