import axios from 'axios';
import { API_URL } from '@/constants/api';
import { getAuthHeaders, getHeaders } from './utils/utils';
import { SignUp } from '@/interfaces/user';

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}user/me`, getAuthHeaders());
    return res.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editUser = async (payload: any) => {
  try {
    console.log('payload', payload);
    const res = await axios.patch(`${API_URL}user`, payload, getHeaders());
    return res.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
