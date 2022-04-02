import axios from 'axios';
import { useQuery } from 'react-query';
import Entity from 'types/enums/Entity';

import { IFile } from '@orca/types';

const useFilesQuery = () => {
  return useQuery<IFile[], Error>(Entity.Files, async () => {
    const response = await axios.get("/api/files")
    return response.data
  });
};

export default useFilesQuery;
