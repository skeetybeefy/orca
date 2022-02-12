import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((config) => {
  config.headers!.Authorization = "Bearer test";
  return config;
});

export default API;
