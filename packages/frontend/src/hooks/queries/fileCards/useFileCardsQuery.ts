import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFileCard } from '@orca/types';

const useFileCardsQuery = () => {
  return useQuery<IFileCard[], Error>(
    Entity.FileCards,
    async () => {
      const { data } = await axios.get("/api/fileCards")
      return data
    }
  );
};

export default useFileCardsQuery;
