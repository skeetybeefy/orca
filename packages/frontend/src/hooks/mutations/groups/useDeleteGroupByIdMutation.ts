import GroupsService from "api/services/groups";
import { IGroup } from "monotypes/IGroup.interface";
import { useMutation, useQueryClient } from "react-query";
import Entity from "types/enums/Entity";

const useDeleteGroupByIdMutation = (id: IGroup["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(() => GroupsService.deleteById(id), {
    async onMutate() {
      await queryClient.cancelQueries(Entity.Groups);
      const previousGroups = queryClient.getQueryData(Entity.Groups);
      queryClient.setQueryData<IGroup[]>(
        Entity.Groups,
        (groups) => groups?.filter((group) => group.id !== id) || []
      );
      return { previousGroups };
    },
    onSettled() {
      queryClient.invalidateQueries(Entity.Groups);
    },
  });
};

export default useDeleteGroupByIdMutation;
