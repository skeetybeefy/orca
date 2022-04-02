import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, IGroup } from '@orca/types';
import HTTPMethods from 'types/enums/HTTPMethods';

const handler = async (req, res) => {
    const options = getRequestOptions(req)
    const { groupId } = req.query

    switch (req.method) {
        case HTTPMethods.PATCH: {
            const group = req.body
            const { data } = await API.patch(`${ApiRoute.Groups}/${groupId}`, group, options)
            res.send(data)
            break
        }
        case HTTPMethods.DELETE: {
            const { data } = await API.delete<IGroup["id"]>(`${ApiRoute.Groups}/${groupId}`, options)
            res.send(data)
            break
        }
    }
}

export default handler