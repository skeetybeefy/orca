import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, AuthenticationRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { headers } = await API.post(`${ApiRoute.Authentication}/${AuthenticationRoute.LogOut}`, null, options)
    res.setHeader('Set-Cookie', headers['set-cookie'])
        .send()

}

export default handler