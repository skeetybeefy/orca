import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import Entity from 'types/enums/Entity';

import { IUser } from '@orca/types';

const useProfileQuery = (options?: Partial<UseQueryOptions<IUser, Error>>) => {
  return useQuery<IUser, Error>(
    Entity.Profile,
    async () => {
      const response = await axios.get<IUser>("/api/auth/authenticate")
      if (response.status === 500) {
        axios.get<IUser>("/api/auth/refresh")
      }
      return response.data
    },
    options
  );
};

export default useProfileQuery;
