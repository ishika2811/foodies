import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";

// ✅ FETCH FOOD LIST
export const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.log("Error fetching food list:", error);
    throw error;
  }
};

// ✅ ADD FOOD (ADD THIS 🔥)
export const addFood = async (foodData) => {
  try {
    const response = await axios.post(`${API_URL}/foods`, foodData);
    return response.data;
  } catch (error) {
    console.log("Error adding food:", error);
    throw error;
  }
};
