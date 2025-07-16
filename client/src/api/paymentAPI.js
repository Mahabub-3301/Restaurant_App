import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const createPaymentIntent = async (amount) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/payment/create-intent`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Payment failed' };
  }
};

export const saveOrder = async (orderData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save order' };
  }
};