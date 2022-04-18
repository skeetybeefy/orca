import axios from "axios";

import {
  ApiRoute,
  AuthenticationRoute,
  ICreateUserDto,
  ICredentials,
  IUser,
} from "@orca/types";

const authUrl = `/api/${ApiRoute.Authentication}`;

class AuthService {
  static async authenticate(): Promise<IUser> {
    const response = await axios.get<IUser>(
      `${authUrl}/${AuthenticationRoute.Auth}`
    );
    return response.data;
  }

  static async logIn(credentials: ICredentials): Promise<IUser> {
    const response = await axios.post<IUser>(
      `${authUrl}/${AuthenticationRoute.LogIn}`,
      credentials
    );
    return response.data;
  }

  static async register(user: ICreateUserDto): Promise<IUser> {
    const response = await axios.post<IUser>(
      `${authUrl}/${AuthenticationRoute.Register}`,
      user
    );
    return response.data;
  }

  static async refresh(): Promise<void> {
    await axios.get(`${authUrl}/${AuthenticationRoute.Refresh}`);
    return;
  }

  static async logOut(): Promise<void> {
    await axios.post(`${authUrl}/${AuthenticationRoute.LogOut}`);
    return;
  }
}

export default AuthService;
