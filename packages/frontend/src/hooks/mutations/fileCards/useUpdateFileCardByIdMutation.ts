import FileCardsService from "api/services/filecards";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

import { IFileCard, IUpdateFileCardDto } from "@orca/types";

const useUpdateFileCardByIdMutation = (id: IFileCard["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedItem: IUpdateFileCardDto) =>
      FileCardsService.updateById(id, updatedItem),
    {
      onSettled() {
        queryClient.invalidateQueries(Entity.FileCards);
      },
    }
  );
};

export default useUpdateFileCardByIdMutation;
