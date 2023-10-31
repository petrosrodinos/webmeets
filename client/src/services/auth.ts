import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { SignInSchema, SignupSchema } from '@/validation-schemas/auth';
// import { UserLogin, NewUser, UserToUpdate } from "../interfaces/typing";

const getConfig = () => {
  return {
    headers: { Authorization: `Bearer ${getAuthState().token}` },
  };
};

export const signInUser = async (payload: typeof SignInSchema): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signin`, payload);
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const signUpUser = async (paylaod: typeof SignupSchema): Promise<any> => {
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
