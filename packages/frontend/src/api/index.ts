import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/`;

const API = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});

API.defaults.baseURL = baseURL;
API.defaults.withCredentials = true;

export default API;
