import FilesService from "api/services/files";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

import { IFile } from "@orca/types";

const useDeleteFileByIdMutation = (id: IFile["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(() => FilesService.deleteById(id), {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useDeleteFileByIdMutation;
