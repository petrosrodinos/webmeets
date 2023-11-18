import { API_URL } from '@/constants/api';
import axios from 'axios';
import { SignIn, SignUp } from '@/interfaces/user';
import { decodeToken } from '@/lib/token';

export const signInUser = async (payload: SignIn): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signin`, payload);
    const { exp } = decodeToken(result.data.token);
    const data = {
      ...result.data,
      exp,
    };
    return data;
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
    const { exp } = decodeToken(result.data.token);
    const data = {
      ...result.data,
      exp,
    };
    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
