import API from "api";

import { ApiRoute, IFile } from "@orca/types";

class FilesService {
  static async create(file: File): Promise<IFile> {
    const data = new FormData();
    data.append("file", file as File);
    const response = await API.post<IFile>(`${ApiRoute.Files}`, data);
    return response.data;
  }

  static async getAll(): Promise<IFile[]> {
    const response = await API.get<IFile[]>(`${ApiRoute.Files}`);
    return response.data;
  }

  static async deleteById(id: IFile["id"]): Promise<IFile["id"]> {
    const response = await API.delete<IFile["id"]>(`${ApiRoute.Files}/${id}`);
    return response.data;
  }
}

export default FilesService;
