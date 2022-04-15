import { NextApiRequest } from "next";

export interface RequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}
