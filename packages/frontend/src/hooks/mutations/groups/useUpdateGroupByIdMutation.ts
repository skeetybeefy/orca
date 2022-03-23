import GroupsService from "api/services/groups";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

import { IGroup, IUpdateGroupDto } from "@orca/types";

const useUpdateGroupByIdMutation = (id: IGroup["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedGroup: IUpdateGroupDto) =>
      GroupsService.updateById(id, updatedGroup),
    {
      onSettled() {
        queryClient.invalidateQueries(Entity.Groups);
      },
    }
  );
};

export default useUpdateGroupByIdMutation;
