import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { Meet, NewMeet } from '@/interfaces/meet';
import { reformMeet } from './reformer/meet';

export const getHeaders = () => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getAuthState().token}`,
    },
  };
};

export const createMeet = async (payload: NewMeet) => {
  try {
    const result = await axios.post(`${API_URL}meets`, payload, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeets = async (filters: { [key: string]: string } = {}): Promise<Meet[]> => {
  try {
    const result = await axios.get(`${API_URL}meets?${new URLSearchParams(filters).toString()}`);
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

export const editMeet = async (id: string, payload: NewMeet) => {
  try {
    const result = await axios.put(`${API_URL}meets/${id}`, payload, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
