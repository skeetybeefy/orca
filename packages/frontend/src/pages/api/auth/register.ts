import API from 'api';
import { NextRequest } from 'next/server';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, AuthenticationRoute } from '@orca/types';

const handler = async (req: Request, res) => {
    const user = req.body
    const options = getRequestOptions(req as NextRequest)
    const { data, headers } = await API.post(`${ApiRoute.Authentication}/${AuthenticationRoute.Register}`, user, options)
    res.setHeader("Set-Cookie", headers['set-cookie'])
        .send(data)
}

export default handler