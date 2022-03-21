import API from "api";
import axios from "axios";

const handler = async (req, res) => {
  const { data } = await API.get("test");
  res.send(data);
};

export default handler;
