import { NextRequest } from "next/dist/server/web/spec-extension/request";

const getJwtCookiesFromRequest = (req: NextRequest) => {
  return Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join(";");
};

export default getJwtCookiesFromRequest;
