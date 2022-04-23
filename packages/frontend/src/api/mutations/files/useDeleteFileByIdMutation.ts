import FilesService from "api/services/files";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useDeleteFileByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(FilesService.deleteById, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useDeleteFileByIdMutation;
