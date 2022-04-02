import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, AuthenticationRoute } from '@orca/types';

const handler = async (req, res) => {
    const user = req.body
    const options = getRequestOptions(req)
    const { data, headers } = await API.post(`${ApiRoute.Authentication}/${AuthenticationRoute.LogIn}`, user, options)

    res.setHeader('Set-Cookie', headers['set-cookie'])
        .send(data)
}

export default handler