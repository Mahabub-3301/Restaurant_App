// api/orders.js

import axios from "axios";

// Fetch orders for a specific user
export const getUserOrders = async (userId, token) => {
  try {
    const response = await axios.get(`/auth/orders/${userId}`, {
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
