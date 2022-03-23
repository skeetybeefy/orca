import API from "api";

import { ApiRoute, ICreateGroupDto, IGroup, IUpdateGroupDto } from "@orca/types";

class GroupsService {
  static async create(group: ICreateGroupDto): Promise<IGroup> {
    const response = await API.post<IGroup>(`${ApiRoute.Groups}`, group);
    return response.data;
  }

  static async getAll(): Promise<IGroup[]> {
    const response = await API.get<IGroup[]>(`${ApiRoute.Groups}`);
    return response.data;
  }

  static async updateById(
    id: IGroup["id"],
    group: IUpdateGroupDto
  ): Promise<IGroup> {
    const response = await API.patch<IGroup>(`${ApiRoute.Groups}/${id}`, group);
    return response.data;
  }

  static async deleteById(id: IGroup["id"]): Promise<IGroup["id"]> {
    const response = await API.delete<IGroup["id"]>(`${ApiRoute.Groups}/${id}`);
    return response.data;
  }
}

export default GroupsService;
