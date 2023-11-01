import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Profile } from '@/interfaces/profile';

const getConfig = () => {
  return {
    headers: { Authorization: `Bearer ${getAuthState().token}` },
  };
};

export const createProfile = async (payload: Profile) => {
  try {
    const result = await axios.post(`${API_URL}profile`, payload);
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
