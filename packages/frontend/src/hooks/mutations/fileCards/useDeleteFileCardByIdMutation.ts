import FileCardsService from "api/services/filecards";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

import { IFileCard } from "@orca/types";

const useDeleteFileCardByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: IFileCard["id"]) => FileCardsService.deleteById(id), {
    onSettled() {
      queryClient.invalidateQueries(Entity.FileCards);
    },
  });
};

export default useDeleteFileCardByIdMutation;
