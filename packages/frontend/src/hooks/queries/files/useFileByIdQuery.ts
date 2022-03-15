import FilesService from "api/services/files";
import { IFile } from "monotypes/IFile.interface";
import { useQuery } from "react-query";
import Entity from "types/enums/Entity";

const useFileByIdQuery = (id: IFile["id"]) => {
  return useQuery<IFile[], Error, IFile | undefined>(
    Entity.Files,
    FilesService.getAll,
    {
      select: (files) => files.find((file) => file.id === id),
    }
  );
};

export default useFileByIdQuery;
