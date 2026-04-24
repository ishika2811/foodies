import axios from "axios";

// ✅ Correct Backend URL (FIXED)
const API_URL = "https://foodies-main-wbtn.onrender.com/api";

// ✅ Axios instance (better practice)
const API = axios.create({
  baseURL: API_URL,
});

// ✅ Helper → get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`
  };
};

// ✅ FETCH ALL FOODS (Public)
export const fetchFoods = async () => {
  try {
    const response = await API.get("/foods");
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

    // backend expects JSON + file
    formData.append("food", JSON.stringify(foodData));
    formData.append("file", image);

    const response = await API.post(
      "/foods",
      formData,
      {
        headers: {
          ...getAuthHeader()
          // ❌ DO NOT set Content-Type manually
        }
      }
    );

    return response.data;

  } catch (error) {
    console.log("Error adding food:", error.response || error);
    throw error;
  }
};

// ✅ DELETE FOOD (Protected)
export const deleteFood = async (id) => {
  try {
    const response = await API.delete(
      `/foods/${id}`,
      {
        headers: {
          ...getAuthHeader()
        }
      }
    );

    return response.data;

  } catch (error) {
    console.log("Error deleting food:", error.response || error);
    throw error;
  }
};
