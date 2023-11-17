import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Service } from '@/interfaces/service';
import { reformService } from './reformer/service';
import { Meet, NewMeet } from '@/interfaces/meet';
import { reformMeet } from './reformer/meet';

export const createMeet = async (payload: NewMeet) => {
  try {
    const result = await axios.post(`${API_URL}meets`, payload, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeets = async (): Promise<Meet[]> => {
  try {
    const result = await axios.get(`${API_URL}meets`);
    const reformedData = result.data.map((meet: any) => reformMeet(meet));
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeet = async (id: string): Promise<Meet> => {
  try {
    const result = await axios.get(`${API_URL}meets/${id}`);
    const reformedData = reformMeet(result.data);
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
