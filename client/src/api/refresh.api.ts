import axios from "axios";
import { API_PATHS } from "@/constants/api.constant";

export const refreshSession = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${API_PATHS.auth.refresh}`,
      {},
      { withCredentials: true },
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
