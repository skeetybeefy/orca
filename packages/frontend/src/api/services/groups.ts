import axios from "axios";

import {
  ApiRoute,
  ICreateGroupDto,
  IGroup,
  IUpdateGroupDto,
} from "@orca/types";

export interface UpdateGroupById {
  id: IGroup["id"];
  group: IUpdateGroupDto;
}

const groupsUrl = `/api/${ApiRoute.Groups}`;

class GroupsService {
  static async create(group: ICreateGroupDto): Promise<IGroup> {
    const response = await axios.post<IGroup>(groupsUrl, group);
    return response.data;
  }

  static async getAll(): Promise<IGroup[]> {
    const response = await axios.get<IGroup[]>(groupsUrl);
    return response.data;
  }

  static async updateById({ id, group }: UpdateGroupById): Promise<IGroup> {
    const response = await axios.patch<IGroup>(`${groupsUrl}/${id}`, group);
    return response.data;
  }

  static async deleteById(id: IGroup["id"]): Promise<IGroup["id"]> {
    const response = await axios.delete<IGroup["id"]>(`${groupsUrl}/${id}`);
    return response.data;
  }
}

export default GroupsService;
