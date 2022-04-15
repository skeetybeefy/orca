import { IUser } from "@orca/types";
import { NextApiRequest } from "next";

export interface RequestWithUserContext extends NextApiRequest {
  userContext: IUser;
}
