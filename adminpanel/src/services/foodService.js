import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";

// ✅ Helper → get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// ✅ FETCH ALL FOODS (Public)
export const fetchFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.log("Error fetching food list:", error);
    throw error;
  }
};

// ✅ ADD FOOD (Protected)
export const addFood = async (foodData, image) => {
  try {
    const formData = new FormData();

    formData.append("food", JSON.stringify(foodData));
    formData.append("file", image);

    const response = await axios.post(
      `${API_URL}/foods`,
      formData,
      {
        headers: {
          ...getAuthHeader().headers,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.log("Error adding food:", error);
    throw error;
  }
};

// ✅ DELETE FOOD (🔥 FIXED)
export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/foods/${id}`,
      getAuthHeader()   // ✅ TOKEN ADDED HERE
    );

    return response.data;

  } catch (error) {
    console.log("Error deleting food:", error);
    throw error;
  }
};
