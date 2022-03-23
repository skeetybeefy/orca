import API from "api";

import { ApiRoute, AuthenticationRoute, ICreateUserDto, ICredentials, IUser } from "@orca/types";

class AuthService {
  static async authenticate(): Promise<IUser> {
    const response = await API.get<IUser>(`${ApiRoute.Authentication}/auth`);
    return response.data;
  }

  static async logIn(credentials: ICredentials): Promise<IUser> {
    const response = await API.post<IUser>(
      `${ApiRoute.Authentication}/${AuthenticationRoute.LogIn}`,
      credentials
    );
    return response.data;
  }

  static async register(user: ICreateUserDto): Promise<IUser> {
    const response = await API.post<IUser>(
      `${ApiRoute.Authentication}/${AuthenticationRoute.Register}`,
      user
    );
    return response.data;
  }

  static async logOut(): Promise<void> {
    await API.post(`${ApiRoute.Authentication}/${AuthenticationRoute.LogOut}`);
    return;
  }
}

export default AuthService;
