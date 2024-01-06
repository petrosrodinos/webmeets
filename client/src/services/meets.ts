import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { AddPeriod, DeletePeriod, EditPeriod, Meet, NewMeet } from '@/interfaces/meet';
import { formatMeet } from './formatter/meet';

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

export const getMeets = async (query: { [key: string]: string } = {}): Promise<Meet[]> => {
  try {
    const result = await axios.get(`${API_URL}meets?${new URLSearchParams(query).toString()}`);
    const formattedData = result.data.map((meet: any) => formatMeet(meet));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMeet = async (id: string): Promise<Meet> => {
  try {
    const result = await axios.get(`${API_URL}meets/${id}`);
    const formattedData = formatMeet(result.data);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editMeet = async (id: string, payload: NewMeet) => {
  try {
    const result = await axios.patch(`${API_URL}meets/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const addPeriod = async (payload: AddPeriod) => {
  try {
    const { meetId, hourId } = payload;
    const period = { from: payload.from, to: payload.to };
    const result = await axios.post(`${API_URL}meets/${meetId}/hours/${hourId}/periods`, period, {
      headers: {
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editPeriod = async (payload: EditPeriod) => {
  try {
    const { meetId, hourId, periodId } = payload;
    const period = { from: payload.from, to: payload.to };
    const result = await axios.patch(`${API_URL}meets/${meetId}/hours/${hourId}/periods/${periodId}`, period, {
      headers: {
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deletePeriod = async (payload: DeletePeriod) => {
  const { meetId, hourId, periodId } = payload;
  try {
    const result = await axios.delete(`${API_URL}meets/${meetId}/hours/${hourId}/periods/${periodId}`, {
      headers: {
        Authorization: `Bearer ${getAuthState().token}`,
      },
    });
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
