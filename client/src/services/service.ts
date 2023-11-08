import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Service } from '@/interfaces/service';

export const createService = async (payload: Service) => {
  try {
    const result = await axios.post(`${API_URL}service`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getServices = async () => {
  try {
    const result = await axios.get(`${API_URL}service`);
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
