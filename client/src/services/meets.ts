import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Service } from '@/interfaces/service';
import { reformService } from './reformer/service';
import { Meet } from '@/interfaces/meet';

export const createMeet = async (payload: Meet) => {
  try {
    const result = await axios.post(`${API_URL}sermeetvice`, payload, {
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

export const getMeets = async (): Promise<Service[]> => {
  try {
    const result = await axios.get(`${API_URL}meet`);
    const reformedData = result.data.map((service: any) => reformService(service));
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeet = async (id: string): Promise<Service> => {
  try {
    const result = await axios.get(`${API_URL}meet/${id}`);
    const reformedData = reformService(result.data);
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
