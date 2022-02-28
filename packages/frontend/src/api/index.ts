import axios from "axios";

const API = axios.create({
  withCredentials: true,
});

// API.defaults.baseURL = "http://localhost:4000";
// API.defaults.withCredentials = true;
// API.defaults.proxy = {
//   host: "localhost",
//   port: 4000,
// };

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log({ baseUrl });

API.defaults.baseURL = baseUrl;
API.defaults.withCredentials = true;

// API.interceptors.request.use((config) => {
//   config.headers!.Authorization = "Bearer test";
//   return config;
// });

export default API;
