import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFile } from '@orca/types';

const useFileByIdQuery = (id: IFile["id"] | undefined) => {
  return useQuery<IFile[], Error, IFile | undefined>(
    Entity.Files,
    async () => {
      const response = await axios.get("api/files")
      return response.data
    },
    {
      select: (files) => files.find((file) => file.id === id),
      enabled: !!id,
    }
  );
};

export default useFileByIdQuery;
