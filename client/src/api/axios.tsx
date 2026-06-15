import { authStore } from "@/store/auth.store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = authStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = authStore.getState().actions;
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        await refreshToken();
      }
      if (status === 403) {
        console.error("Forbidden: You don't have access to this resource.");
      }

      if (status !== undefined && status >= 500) {
        console.error("Server error:", error.response?.data);
      }

      return Promise.reject({
        message:
          (error.response?.data as { message?: string })?.message ??
          error.message ??
          "Something went wrong",
        status,
      });
    }

    return Promise.reject(error);
  },
);

export default api;
