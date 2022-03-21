import FilesService from "api/services/files";
import { IFile } from "monotypes/IFile.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useFilesQuery = () => {
  return useQuery<IFile[], Error>(Entity.Files, FilesService.getAll);
};

export default useFilesQuery;
