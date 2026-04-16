import axios from "axios";

const API_URL = "https://foodies-28.onrender.com/api";   // base URL

// Add to cart - POST /api/add   (or /api/cart/add)
export const addToCart = async (foodId, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/add`,           // ← Change this
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;           // better to return data
    } catch (error) {
        console.error('Error while adding to cart:', error.response?.data || error.message);
        throw error;                    // re-throw if you want to handle in UI
    }
};

// Remove one quantity - POST /api/remove
export const removeQtyFromCart = async (foodId, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/remove`,        // ← This one looks correct
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error while removing qty from cart:', error.response?.data || error.message);
        throw error;
    }
};

// Get cart - GET /api  (or /api/cart)
export const getCartData = async (token) => {
    try {
        const response = await axios.get(API_URL, {   // ← This is fine if your backend uses GET /api
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.items || response.data;  // adjust based on actual response shape
    } catch (error) {
        console.error('Error while fetching cart:', error.response?.data || error.message);
        throw error;
    }
};

// Clear cart - DELETE /api
export const clearCartItems = async (token, setQuantities) => {
    try {
        await axios.delete(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuantities?.({});   // optional chaining is safer
    } catch (error) {
        console.error('Error while clearing the cart:', error.response?.data || error.message);
        throw error;
    }
};
