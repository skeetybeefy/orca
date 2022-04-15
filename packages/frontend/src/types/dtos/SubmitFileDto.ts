import { IFile } from "@orca/types";

export declare type SubmitFileDto = Pick<
  IFile,
  "filename" | "category" | "allowedGroupsIds" | "description"
> & {
  file?: File;
};
