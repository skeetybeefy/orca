import FileCardsService from "api/services/filecards";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useCreateFileCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(FileCardsService.create, {
    onSettled() {
      queryClient.invalidateQueries(Entity.FileCards);
    },
  });
};

export default useCreateFileCardMutation;
