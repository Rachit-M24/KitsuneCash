import axios from "axios";

export const refreshSession = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/refresh",
      {},
      { withCredentials: true }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};