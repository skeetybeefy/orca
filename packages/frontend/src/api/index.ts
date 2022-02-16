import axios from "axios";

const API = axios.create({
  withCredentials: true,
});

API.defaults.baseURL = "http://localhost:4000";
API.defaults.withCredentials = true;
API.defaults.proxy = {
  host: "backend",
  port: 4000,
};

// API.interceptors.request.use((config) => {
//   config.headers!.Authorization = "Bearer test";
//   return config;
// });

export default API;
