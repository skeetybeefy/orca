import GroupsService from "api/services/groups";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useDeleteGroupByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GroupsService.deleteById, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Groups);
    },
  });
};

export default useDeleteGroupByIdMutation;
