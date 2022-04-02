import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';
import Routes from 'types/enums/Routes';

import { ICredentials, IUser } from '@orca/types';

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post("/api/auth/login", credentials)
    return response.data
  }, {
    onSuccess(data) {
      queryClient.setQueryData(Entity.Profile, data);
      router.push(Routes.Dashboard);
    },
  });
};

export default useLoginMutation;
