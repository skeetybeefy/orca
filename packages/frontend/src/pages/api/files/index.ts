import API from "api";
import authenticationMiddleware from "api/middlewares/authenticationMiddleware";
import fileUploadMiddleware from "api/middlewares/fileUploadMiddleware";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { RequestWithFile } from "types/api/RequestWithFile";
import { RequestWithUserContext } from "types/api/RequestWithUserContext";
import getRequestOptions from "util/getRequestOptions";

import { ApiRoute, IFile } from "@orca/types";
import handlerBase from "api/base";

type ExtendedNextApiRequest = RequestWithFile & RequestWithUserContext;

const handler = nextConnect<ExtendedNextApiRequest, NextApiResponse>(
  handlerBase
)
  .post(
    authenticationMiddleware,
    fileUploadMiddleware("files", "file"),
    async (req, res) => {
      const { file, body } = req;
      const fileInfo = {
        ...file,
        ...body,
        allowedGroupsIds: body.allowedGroupsIds || [],
      };
      const options = getRequestOptions(req);
      const { data } = await API.post<IFile>(
        `${ApiRoute.Files}`,
        fileInfo,
        options
      );
      res.send(data);
    }
  )
  .get(async (req, res) => {
    const options = getRequestOptions(req);
    const { data } = await API.get<IFile[]>(`${ApiRoute.Files}`, options);
    res.send(data);
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
