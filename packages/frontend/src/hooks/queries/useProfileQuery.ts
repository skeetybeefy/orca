import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import Entity from 'types/enums/Entity';

const useProfileQuery = (options?: Partial<UseQueryOptions<AxiosResponse, Error>>) => {
  return useQuery<AxiosResponse, Error>(
    Entity.Profile,
    async () => {
      const response = await axios.get("/api/auth/authenticate")
      if (response.status === 500) {
        axios.get("/api/auth/refresh")
      }
      return response.data
    },
    options
  );
};

export default useProfileQuery;
