import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, AuthenticationRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { data } = await API.get(`${ApiRoute.Authentication}/${AuthenticationRoute.Refresh}`, options)
    res.send(data)
}

export default handler