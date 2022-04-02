import API from 'api';
import HTTPMethods from 'types/enums/HTTPMethods';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute } from '@orca/types';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { fileCardId } = req.query

    switch (req.method) {
        case HTTPMethods.DELETE: {
            const { data } = await API.delete(`${ApiRoute.FileCards}/${fileCardId}`, options)
            res.send(data)
            break
        }
        case HTTPMethods.PATCH: {
            const fileCard = req.body
            const { data } = await API.patch(`${ApiRoute.FileCards}/${fileCardId}`, fileCard, options)
            res.send(data)
            break
        }
    }
}

export default handler