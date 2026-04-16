import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";

// ✅ FETCH ALL FOODS
export const fetchFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.log("Error fetching food list:", error);
    throw error;
  }
};

// ✅ ADD FOOD (🔥 FIXED WITH FORM DATA)
export const addFood = async (foodData, image) => {
  try {
    const formData = new FormData();

    // IMPORTANT: backend expects "food" as JSON string
    formData.append("food", JSON.stringify(foodData));

    // IMPORTANT: backend expects "file"
    formData.append("file", image);

    const response = await axios.post(
      `${API_URL}/foods`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.log("Error adding food:", error);
    throw error;
  }
};

// ✅ DELETE FOOD
export const deleteFood = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/foods/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting food:", error);
    throw error;
  }
};
