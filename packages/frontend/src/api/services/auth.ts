import API from "api";
import Errors from "types/enums/Errors";
import { IAuthCredentials, IAuthState } from "types/interfaces/auth";

class AuthService {
  static async login(credentials: IAuthCredentials): Promise<IAuthState> {
    return API.post("/log-in", credentials);
  }

  static async register(credentials: IAuthCredentials): Promise<IAuthState> {
    if (credentials.email === "admin" && credentials.password === "admin") {
      return {
        authToken: "testAuth",
        refreshToken: "testRefresh",
      };
    } else {
      throw new Error(Errors.UserCannotBeCreated);
    }
  }
}

export default AuthService;
