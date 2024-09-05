import axios from "axios";

export const logout = async (token) => {
  try {
    const response = await axios.get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/logout/${token}`
    );
    console.log("User disconnected", response);
  } catch (error) {
    console.error(error);
  }
};
