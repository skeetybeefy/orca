import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { SubmitFileDto } from "types/dtos/SubmitFileDto";
import Entity from "types/enums/Entity";

import { IFile } from "@orca/types";

const useCreateFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ file, ...values }: SubmitFileDto) => {
      console.log({ values });
      const formData = new FormData();
      formData.append("file", file);
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.post<IFile>("/api/files", formData);
      return response.data;
    },
    {
      onSettled() {
        queryClient.invalidateQueries(Entity.Files);
      },
    }
  );
};

export default useCreateFileMutation;
