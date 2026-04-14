import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";

// ✅ FETCH ALL FOODS (rename to match usage)
export const fetchFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.log("Error fetching food list:", error);
    throw error;
  }
};

// ✅ ADD FOOD
export const addFood = async (foodData) => {
  try {
    const response = await axios.post(`${API_URL}/foods`, foodData);
    return response.data;
  } catch (error) {
    console.log("Error adding food:", error);
    throw error;
  }
};

// ✅ DELETE FOOD (also required 🔥)
export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/foods/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting food:", error);
    throw error;
  }
};
