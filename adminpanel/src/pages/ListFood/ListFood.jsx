const BASE_URL = "https://foodies-28.onrender.com/api/foods";

// ✅ GET ALL FOODS (Public)
export const fetchFoods = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch foods");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

// ✅ DELETE FOOD (Protected - needs token)
export const deleteFood = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      console.error("Delete failed:", response.status);
      return false;
    }

    return true;

  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};
