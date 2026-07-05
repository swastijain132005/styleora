import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "../src/utils/token";

const axiosClient = axios.create({
  baseURL: "https://styleora-mr50.onrender.com",
  withCredentials: true,
});

// ---------------- REQUEST INTERCEPTOR ----------------
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- RESPONSE INTERCEPTOR ----------------
axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response means network/server error
    if (!error.response) {
      return Promise.reject(error);
    }

    // Don't retry twice
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't refresh these endpoints
    const skipRefresh =
      originalRequest.url?.includes("/login") ||
      originalRequest.url?.includes("/register") ||
      originalRequest.url?.includes("/refresh-token") ||
      originalRequest.url?.includes("/check");

    if (error.response.status === 401 && !skipRefresh) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "https://styleora-mr50.onrender.com/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (err) {
        clearAccessToken();

        // Redirect only once
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;