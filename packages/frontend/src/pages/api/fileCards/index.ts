import API from 'api';
import HTTPMethods from 'types/enums/HTTPMethods';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)

    switch (req.method) {
        case HTTPMethods.GET: {
            const { data } = await API.get(`${ApiRoute.FileCards}`, options)
            res.send(data)
            break
        }
        case HTTPMethods.POST: {
            const fileCard = req.body
            const { data } = await API.post(`${ApiRoute.FileCards}`, fileCard, options)
            res.send(data)
            break
        }
    }
}

export default handler