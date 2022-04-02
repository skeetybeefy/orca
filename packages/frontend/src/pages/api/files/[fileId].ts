import API from 'api';
import HTTPMethods from 'types/enums/HTTPMethods';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { fileId } = req.query

    switch (req.method) {
        case HTTPMethods.DELETE: {
            const { data } = await API.delete(`${ApiRoute.Files}/${fileId}`, options)
            res.send(data)
            break
        }
    }
}

export default handler