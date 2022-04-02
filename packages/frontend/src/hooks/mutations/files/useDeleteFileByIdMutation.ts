import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFile } from '@orca/types';

const useDeleteFileByIdMutation = (id: IFile["id"]) => {
  const queryClient = useQueryClient();
  return useMutation(async () => {
    const response = await axios.delete(`/api/files/${id}`)
    return response.data
  }, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useDeleteFileByIdMutation;
