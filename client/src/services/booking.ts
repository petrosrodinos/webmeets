import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Booking, NewBooking } from '@/interfaces/booking';
import { formatBooking } from './formatter/booking';

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

//{profileId} for getting profile bookings
//{userId} for getting user bookings
export const getBookings = async (query: { [key: string]: string }): Promise<Booking[]> => {
  try {
    const result = await axios.get(`${API_URL}bookings?${new URLSearchParams(query).toString()}`, getHeaders());
    const formattedData = result.data.map((booking: any) => formatBooking(booking));
    console.log('asddd', formattedData);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
