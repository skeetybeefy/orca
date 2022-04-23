import { ApiRoute } from "@orca/types"
import API from "api"
import getRequestOptions from "util/getRequestOptions"

const handler = async (req, res) => {
  const { userId } = req.query 
  const profile = req.body
  const options = getRequestOptions(req)

  const { data } = await API.patch(`${ApiRoute.Users}/${userId}`, profile, options) 
  res.send(data)
}

export default handler