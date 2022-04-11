import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { data } = await API.get(`${ApiRoute.Authentication}/auth`, options)
    res.send(data)
}

export default handler