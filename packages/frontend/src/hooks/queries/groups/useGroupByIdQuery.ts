import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IGroup } from '@orca/types';

const useGroupByIdQuery = (id: IGroup["id"] | undefined) => {
  return useQuery<IGroup[], Error, IGroup | undefined>(
    Entity.Groups,
    async () => {
      const response = await axios.get<IGroup[]>("/api/groups")
      return response.data
    },
    {
      select: (items) => items.find((item) => item.id === id),
      enabled: !!id,
    }
  );
};

export default useGroupByIdQuery;
