import axios from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';
import Routes from 'types/enums/Routes';

import { ICreateUserDto, IUser } from '@orca/types';

const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation(async (user: ICreateUserDto): Promise<IUser> => {
    const response = await axios.post("/api/auth/register", user)
    return response.data
  }, {
    onSuccess(data) {
      queryClient.setQueryData(Entity.Profile, data);
      router.push(Routes.Dashboard);
    },
  })
}

export default useRegisterMutation;
