import { AxiosRequestConfig } from 'axios';
import { NextApiRequest } from 'next/types';
import getJwtCookiesFromRequest from 'util/getJwtCookiesFromRequest';

const getRequestOptions = (
  req: NextApiRequest,
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
