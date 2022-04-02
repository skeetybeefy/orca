import API from 'api';
import HTTPMethods from 'types/enums/HTTPMethods';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    switch (req.method) {
        case HTTPMethods.GET: {
            const { data } = await API.get(`${ApiRoute.Files}`, options)
            res.send(data)
            break
        }
        case HTTPMethods.POST: {
            const file = req.body
            const contentType = req.headers["content-type"]
            const { data } = await API.post(`${ApiRoute.Files}`, file, options)
            res.setHeader("Content-Type", contentType)
                .send(data)
            break
        }
    }
}

export default handler