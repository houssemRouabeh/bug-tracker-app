import axios from "axios";

export const getUsers = async (token) => {
  try {
    const response = await axios.get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/users/${token}`
    );
    return response.data.result.user;
  } catch (error) {
    console.log("error while getting users", error);
  }
};
