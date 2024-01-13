import { API_URL } from '@/constants/api';
import axios from 'axios';
import { Booking, BookingAvailability, BookingPeriod, NewBooking } from '@/interfaces/booking';
import { formatAvailablePeriods, formatBooking } from './formatter/booking';
import { createParams, getAuthHeaders, getHeaders } from './utils/utils';

export const createBooking = async (payload: NewBooking) => {
  try {
    const result = await axios.post(`${API_URL}bookings`, payload, getAuthHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

//{profileId} for getting profile bookings
//{userId} for getting user bookings
export const getBookings = async (query: { [key: string]: string }): Promise<Booking[]> => {
  try {
    const result = await axios.get(`${API_URL}bookings?${createParams(query)}`, getAuthHeaders());
    const formattedData = result.data.map((booking: any) => formatBooking(booking));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editBooking = async (payload: Booking) => {
  try {
    const result = await axios.patch(`${API_URL}bookings/${payload.id}`, payload, getAuthHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const bookingAvailability = async (query: BookingAvailability): Promise<BookingPeriod[]> => {
  try {
    const result = await axios.get(`${API_URL}bookings/availability?${createParams(query)}`, getAuthHeaders());
    const formattedData = formatAvailablePeriods(result.data.availability);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
