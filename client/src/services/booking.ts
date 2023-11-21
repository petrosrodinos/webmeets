import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { NewBooking } from '@/interfaces/booking';

export const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAuthState().token}`,
    },
  };
};

export const createBooking = async (payload: NewBooking) => {
  try {
    const result = await axios.post(`${API_URL}bookings`, payload, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
