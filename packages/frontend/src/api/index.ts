import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

API.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
// API.defaults.withCredentials = true;

// API.interceptors.request.use((config) => {
//   config.headers!.Authorization = "Bearer test";
//   return config;
// });

export default API;
