import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { ICreateGroupDto, IGroup } from '@orca/types';

const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (group: ICreateGroupDto): Promise<IGroup> => {
    const { data } = await axios.post("/api/groups", group)
    return data
  }, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Groups);
    },
  });
};

export default useCreateGroupMutation;
