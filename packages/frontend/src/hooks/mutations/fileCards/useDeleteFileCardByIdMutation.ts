import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFileCard } from '@orca/types';

const useDeleteFileCardByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (id: IFileCard["id"]) => {
    const { data } = await axios.delete<IFileCard["id"]>(`/api/fileCards/${id}`)
    return data
  }, {
    onSettled() {
      queryClient.invalidateQueries(Entity.FileCards);
    },
  });
};

export default useDeleteFileCardByIdMutation;
