import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IGroup } from '@orca/types';

const useGroupsQuery = () => {
  return useQuery<IGroup[], Error>(Entity.Groups, async () => {
    const response = await axios.get("/api/groups")
    return response.data
  });
};

export default useGroupsQuery;
