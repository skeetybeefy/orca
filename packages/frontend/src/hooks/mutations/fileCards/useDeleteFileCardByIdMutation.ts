import FileCardsService from "api/services/filecards";
import { IFileCard } from "monotypes/IFileCard.interface";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useDeleteFileCardByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: IFileCard["id"]) => FileCardsService.deleteById(id), {
    onSettled() {
      queryClient.invalidateQueries(Entity.FileCards);
    },
  });
};

export default useDeleteFileCardByIdMutation;
