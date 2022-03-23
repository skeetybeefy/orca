import { AxiosRequestConfig } from "axios";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import getJwtCookiesFromRequest from "util/getJwtCookiesFromRequest";

const getRequestOptions = (
  req: NextRequest,
  options: AxiosRequestConfig<any> = {}
) => {
  return {
    ...options,
    headers: {
      ...options?.headers,
      Cookie: getJwtCookiesFromRequest(req),
    },
  };
};

export default getRequestOptions;
