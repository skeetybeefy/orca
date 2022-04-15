import API from "api";
import { NextApiResponse } from "next";
import { RequestWithUserContext } from "types/api/RequestWithUserContext";
import getRequestOptions from "util/getRequestOptions";

import { ApiRoute, AuthenticationRoute, IUser } from "@orca/types";

const authenticationMiddleware = async (
  req: RequestWithUserContext,
  _: NextApiResponse,
  next: Function
) => {
  const options = getRequestOptions(req);
  try {
    const { data } = await API.get<IUser>(
      `${ApiRoute.Authentication}/${AuthenticationRoute.Auth}`,
      options
    );
    req.userContext = data;
    next();
  } catch (e) {
    console.log({ e });
    throw e;
  }
};

export default authenticationMiddleware;
