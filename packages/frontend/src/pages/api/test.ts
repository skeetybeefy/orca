import API from "api";
import getRequestOptions from "util/getRequestOptions";

const handler = async (req, res) => {
  const options = getRequestOptions(req);
  const { data } = await API.get("test", options);
  res.send(data);
};

export default handler;
