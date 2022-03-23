import API from "api";

import { ApiRoute, ICreateUserDto, IUpdateUserDto, IUser } from "@orca/types";

class UsersService {
  static async create(user: ICreateUserDto): Promise<IUser> {
    const response = await API.post<IUser>(`${ApiRoute.Users}`);
    return response.data;
  }

  static async updateById(
    id: IUser["id"],
    user: IUpdateUserDto
  ): Promise<IUser> {
    const response = await API.patch<IUser>(`${ApiRoute.Users}/${id}`, user);
    return response.data;
  }

  static async getAll(): Promise<IUser[]> {
    const response = await API.get<IUser[]>(`${ApiRoute.Users}`);
    return response.data;
  }

  static async deleteById(id: IUser["id"]): Promise<IUser["id"]> {
    const response = await API.delete<IUser["id"]>(`${ApiRoute.Users}/${id}`);
    return response.data;
  }
}

export default UsersService;
