// utils/axiosClient.js
import axios from "axios";
import { useAuthStore } from "@/counterstore";
const axiosClient = axios.create({
  baseURL: "https://localhost:3000",
   withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {

   const token = useAuthStore.getState().token;   // ✅ correct token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
