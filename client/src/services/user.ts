import axios from 'axios';
import { API_URL } from '@/constants/api';
import { getAuthHeaders } from './utils/utils';

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}user/me`, getAuthHeaders());

    return res.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
