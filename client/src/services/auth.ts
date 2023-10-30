import { API_URL } from '@/constants/api';
import axios from 'axios';
// import { getAuthState } from "../store/authStore";
// import { UserLogin, NewUser, UserToUpdate } from "../interfaces/typing";

// const getConfig = () => {
//   return {
//     headers: { Authorization: `Bearer ${getAuthState().token}` },
//   };
// };

export const signInUser = async (paylaod: any): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signin`, paylaod);
    return result.data;
  } catch (err: any) {
    console.log('err', err);
    throw err?.response?.data?.message;
  }
};

export const signUpUser = async (paylaod: any): Promise<any> => {
  try {
    const result = await axios.post(`${API_URL}auth/signup`, paylaod);
    return result.data;
  } catch (err: any) {
    console.log('err', err);
    throw err?.response?.data?.message;
  }
};
