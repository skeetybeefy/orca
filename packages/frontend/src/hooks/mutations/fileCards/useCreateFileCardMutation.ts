import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

import { ICreateFileCardDto, IFileCard } from '@orca/types';

const useCreateFileCardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (fileCard: ICreateFileCardDto) => {
    const { data } = await axios.post<IFileCard>("/api/fileCards", fileCard)
    return data
  }, {
    onSettled() {
      queryClient.invalidateQueries(Entity.FileCards);
    },
  });
};

export default useCreateFileCardMutation;
