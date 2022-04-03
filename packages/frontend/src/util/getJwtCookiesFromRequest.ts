import { NextApiRequest } from "next/types";

const getJwtCookiesFromRequest = (req: NextApiRequest) => {
  return Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");
};

export default getJwtCookiesFromRequest;
