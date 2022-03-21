import { IUser } from "monotypes/IUser.interface";

export type ICredentials = Pick<IUser, "email" | "password">;
