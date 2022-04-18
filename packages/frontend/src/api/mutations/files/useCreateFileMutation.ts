import FilesService from "api/services/files";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useCreateFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(FilesService.create, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useCreateFileMutation;
