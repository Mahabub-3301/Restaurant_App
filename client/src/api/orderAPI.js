// api/orders.js

import axios from "axios";

// Fetch orders for a specific user
export const getUserOrders = async (userId, token) => {
  const API_URL = import.meta.env.VITE_API_URL || '/api'
  try {
    const response = await axios.get(`${API_URL}/auth/orders/:${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
