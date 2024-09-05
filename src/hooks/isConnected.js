import axios from "axios";

export const isConnected = async () => {
  try {
    const response = await axios.get(
      "http://greenvelvet.alwaysdata.net/bugTracker/api/ping"
    );
    return response.statusText;
  } catch (error) {
    console.error("Error while checking connection:", error);
    return null;
  }
};
