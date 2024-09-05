import axios from "axios";

export const createUser = async (userName, password) => {
  try {
    const response = await axios.get(
      `http://greenvelvet.alwaysdata.net/bugTracker/api/signup/${userName}/${password}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw error;
  }
};
