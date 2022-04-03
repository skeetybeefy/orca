import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFileCard, IUpdateFileCardDto } from '@orca/types';

const useUpdateFileCardByIdMutation = (id: IFileCard["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(async (updatedItem: IUpdateFileCardDto) => {
    const { data } = await axios.patch<IFileCard>(`/api/fileCards/${id}`, updatedItem)
    return data
  },
    {
      onSettled() {
        queryClient.invalidateQueries(Entity.FileCards);
      },
    }
  );
};

export default useUpdateFileCardByIdMutation;
