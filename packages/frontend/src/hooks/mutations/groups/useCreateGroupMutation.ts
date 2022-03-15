import GroupsService from "api/services/groups";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GroupsService.create, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Groups);
    },
  });
};

export default useCreateGroupMutation;
