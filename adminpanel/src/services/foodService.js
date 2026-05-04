import axios from "axios";

<<<<<<< HEAD
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
=======
const API_URL = 'http://localhost:8080/api/foods';

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image); 

    try {
        await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data"}});
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export const getFoodList = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log('Error fetching food list', error);
        throw error;
    }
}

export const deleteFood = async (foodId) => {
    try {
        const response = await axios.delete(API_URL+"/"+foodId);
        return response.status === 204;
    } catch (error) {
        console.log('Error while deleting the food.', error);
        throw error;
    }
}
>>>>>>> 7949972 (removed submodule and updated files)
