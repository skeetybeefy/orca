import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IUser } from '@orca/types';

const useUsersQuery = () => {
  return useQuery<IUser[], Error>(Entity.Users, async () => {
    const { data } = await axios.get("/api/users/getAll")
    return data
  });
};

export default useUsersQuery;
