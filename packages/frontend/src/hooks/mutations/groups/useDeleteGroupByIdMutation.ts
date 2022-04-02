import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { IGroup } from '@orca/types';

const useDeleteGroupByIdMutation = (id: IGroup["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(async (): Promise<IGroup["id"]> => {
    const { data } = await axios.delete(`/api/groups/${id}`)
    return data
  }, {
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
