import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { IGroup, IUpdateGroupDto } from '@orca/types';

const useUpdateGroupByIdMutation = (id: IGroup["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(async (updatedGroup: IUpdateGroupDto): Promise<IGroup> => {
    const { data } = await axios.patch<IGroup>(`/api/groups/${id}`, updatedGroup)
    return data
  },
    {
      onSettled() {
        queryClient.invalidateQueries(Entity.Groups);
      },
    }
  );
};

export default useUpdateGroupByIdMutation;
