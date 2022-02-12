import Categories from "types/enums/Categories";

export interface IDocument {
  id: number;
  name: string;
  description: string;
  category: Categories;
  ownerId: string;
  accessGroups: string[];
}
