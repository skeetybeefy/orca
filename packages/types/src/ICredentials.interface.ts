import { IUser } from "./IUser.interface";

export type ICredentials = Pick<IUser, "password" | "email">;
