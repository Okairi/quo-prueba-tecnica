import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic ${process.env.NEXT_PUBLIC_BEAR}`;
  return config;
});

export default axiosInstance;
