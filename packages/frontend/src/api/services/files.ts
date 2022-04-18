import { ApiRoute, IFile } from "@orca/types";
import axios from "axios";
import { SubmitFileDto } from "types/dtos/SubmitFileDto";
import { FormDataConverter } from "util/formDataConverter";

const filesUrl = `/api/${ApiRoute.Files}`;

class FilesService {
  static async create({ file, ...values }: SubmitFileDto): Promise<IFile> {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await axios.post<IFile>(filesUrl, formData);
    return response.data;
  }

  static async getAll(): Promise<IFile[]> {
    const response = await axios.get<IFile[]>(filesUrl);
    return response.data;
  }

  static async deleteById(id: IFile["id"]): Promise<IFile["id"]> {
    const response = await axios.delete<IFile["id"]>(`${filesUrl}/${id}`);
    return response.data;
  }
}

export default FilesService;
