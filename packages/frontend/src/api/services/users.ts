import axios from "axios";

import { ApiRoute, ICreateUserDto, IUpdateUserDto, IUser } from "@orca/types";

const usersUrl = `/api/${ApiRoute.Users}`;

class UsersService {
  static async create(user: ICreateUserDto): Promise<IUser> {
    const response = await axios.post<IUser>(usersUrl, user);
    return response.data;
  }

  static async updateById(
    id: IUser["id"],
    user: IUpdateUserDto
  ): Promise<IUser> {
    const response = await axios.patch<IUser>(`${usersUrl}/${id}`, user);
    return response.data;
  }

  static async getAll(): Promise<IUser[]> {
    const response = await axios.get<IUser[]>(usersUrl);
    return response.data;
  }

  static async deleteById(id: IUser["id"]): Promise<IUser["id"]> {
    const response = await axios.delete<IUser["id"]>(`${usersUrl}/${id}`);
    return response.data;
  }
}

export default UsersService;
