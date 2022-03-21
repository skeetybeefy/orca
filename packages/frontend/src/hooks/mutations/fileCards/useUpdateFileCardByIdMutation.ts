import FileCardsService from "api/services/filecards";
import { IFileCard, IUpdateFileCardDto } from "monotypes/IFileCard.interface";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

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
