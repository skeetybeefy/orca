import FilesService from "api/services/files";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

import { IFile } from "@orca/types";

const useFilesQuery = () => {
  return useQuery<IFile[], Error>(Entity.Files, FilesService.getAll);
};

export default useFilesQuery;
