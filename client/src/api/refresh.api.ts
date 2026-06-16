import { API_PATHS } from "@/constants/api.constant";
import axios from "axios";

export const refreshSession = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${API_PATHS.auth.refresh}`,
      {},
      { withCredentials: true },
    );
    return response;
  } catch (error: any) {
    if(error.status === 401){
      
    }
    console.error("Error refreshing token:", error);
    throw error;
  }
};
