import IOption from "types/interfaces/Option";

import { FileCategory } from "@orca/types";

const FileCategories: IOption[] = [
  {
    label: "Текст",
    value: FileCategory.Text,
  },
  {
    label: "Видео",
    value: FileCategory.Video,
  },
];

export default FileCategories;
