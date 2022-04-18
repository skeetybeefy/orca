import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

import GroupsService from "api/services/groups";

const useUpdateGroupByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GroupsService.updateById, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Groups);
    },
  });
};

export default useUpdateGroupByIdMutation;
