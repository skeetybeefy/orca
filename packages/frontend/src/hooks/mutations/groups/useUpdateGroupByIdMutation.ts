import GroupsService from "api/services/groups";
import { IGroup, IUpdateGroupDto } from "monotypes/IGroup.interface";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

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
