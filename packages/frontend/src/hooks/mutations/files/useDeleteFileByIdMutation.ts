import FilesService from "api/services/files";
import { IFile } from "monotypes/IFile.interface";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useDeleteFileByIdMutation = (id: IFile["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(() => FilesService.deleteById(id), {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useDeleteFileByIdMutation;
