import { API_URL } from '@/constants/api';
import axios from 'axios';
import { SignIn, SignUp } from '@/interfaces/auth';

export const signInUser = async (payload: SignIn): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signin`, payload);
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const signUpUser = async (paylaod: SignUp): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signup`, paylaod, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
