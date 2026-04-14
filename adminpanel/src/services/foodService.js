import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";


export const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.log("Error fetching food list:", error);
    throw error;
  }
};
