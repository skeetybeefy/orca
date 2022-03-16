import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;

console.log({ baseURL });

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.defaults.baseURL = baseURL;
API.defaults.withCredentials = true;

export default API;
