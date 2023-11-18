import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Service, NewService } from '@/interfaces/service';
import { reformService } from './reformer/service';

export const createService = async (payload: NewService) => {
  try {
    const result = await axios.post(`${API_URL}services`, payload, {
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

export const getServices = async (filters: { [key: string]: string }): Promise<Service[]> => {
  try {
    const result = await axios.get(`${API_URL}services?${new URLSearchParams(filters).toString()}`);
    const reformedData = result.data.map((service: any) => reformService(service));
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getService = async (id: string): Promise<Service> => {
  try {
    const result = await axios.get(`${API_URL}services/${id}`);
    const reformedData = reformService(result.data);
    return reformedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
