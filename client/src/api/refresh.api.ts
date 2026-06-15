import { API_PATHS } from "@/constants/api.constant";
import api from "./axios";

export const refreshSession = async () => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}${API_PATHS.auth.refresh}`,
      {},
      { withCredentials: true },
    );

    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
