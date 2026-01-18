import axios from "axios";
import { fetchFoodList } from "../service/foodService.js";


const API_URL = "http://localhost:8080/api/foods";

// ✅ ADD FOOD
const fetchFoodList = async () => {
    try{
    
    const response = await axios.get("http://localhost:8080/api/foods");
  return response.data;
 
    }catch(error){
      console.log("Error fetching food list:", error);
      throw error;
    
  }
};