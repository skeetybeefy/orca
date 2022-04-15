import fs from "fs";
import multer from "multer";

import { IUser } from "@orca/types";

const fileUploadMiddleware = (destination: string, fieldname: string) => {
  const storage = multer.diskStorage({
    destination: async (req, _, cb) => {
      const user: IUser = req["userContext"];
      let path = `uploaded/${destination}/${user.nickname}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const middleware = multer({ storage }).single(fieldname);

  return middleware;
};

export default fileUploadMiddleware;
