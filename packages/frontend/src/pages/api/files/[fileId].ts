import API from "api";
import handlerBase from "api/base";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { join } from "path";
import getRequestOptions from "util/getRequestOptions";

import { ApiRoute, IFile } from "@orca/types";

const handler = nextConnect<NextApiRequest, NextApiResponse>(handlerBase)
  .get(async (req, res) => {
    const options = getRequestOptions(req);
    const { fileId } = req.query;

    const { data: file } = await API.get<IFile>(
      `${ApiRoute.Files}/${fileId}`,
      options
    );
    const path = join(process.cwd(), file.path);
    const fileBuffer = readFileSync(path);
    res.setHeader("Content-Type", file.mimetype);
    res.send(fileBuffer);
  })
  .delete(async (req, res) => {
    const options = getRequestOptions(req);
    const { fileId } = req.query;
    const { data } = await API.delete(`${ApiRoute.Files}/${fileId}`, options);
    res.send(data);
  });

export default handler;
