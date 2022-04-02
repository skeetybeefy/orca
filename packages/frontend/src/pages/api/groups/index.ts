import API from 'api';
import getRequestOptions from 'util/getRequestOptions';

import { ApiRoute, IGroup } from '@orca/types';
import HTTPMethods from 'types/enums/HTTPMethods';

const handler = async (req, res) => {
    const options = getRequestOptions(req)

    switch (req.method) {
        case HTTPMethods.GET: {
            const { data } = await API.get<IGroup[]>(`${ApiRoute.Groups}`, options)
            res.send(data)
            break
        }
        case HTTPMethods.POST: {
            const group = req.body
            const { data } = await API.post<IGroup>(`${ApiRoute.Groups}`, group, options)
            res.send(data)
            break
        }
    }
}
export default handler