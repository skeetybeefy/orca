import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Entity from 'types/enums/Entity';

const useCreateFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(async (file: File) => {
    const data = new FormData()
    data.append("file", file as File)
    const response = await axios.post("/api/files", data)
    return response.data
  }, {
    onSettled() {
      queryClient.invalidateQueries(Entity.Files);
    },
  });
};

export default useCreateFileMutation;
