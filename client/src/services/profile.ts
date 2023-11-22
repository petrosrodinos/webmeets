import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { CreateProfile } from '@/interfaces/profile';

export const createProfile = async (payload: CreateProfile) => {
  try {
    const result = await axios.post(`${API_URL}profiles`, payload, {
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
