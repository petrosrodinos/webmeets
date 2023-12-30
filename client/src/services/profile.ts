import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getAuthState } from '../store/authStore';
import { CreateProfile, Profile } from '@/interfaces/profile';
import { formatProfile } from './formatter/profile';
import { formatMeet } from './formatter/meet';
import { Meet } from '@/interfaces/meet';

export const createProfile = async (payload: CreateProfile) => {
  try {
    const result = await axios.post(`${API_URL}profiles`, payload, {
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

export const editProfile = async (payload: CreateProfile) => {
  try {
    const result = await axios.patch(`${API_URL}profiles`, payload, {
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

export const getProfileById = async (id: string) => {
  try {
    const result = await axios.get(`${API_URL}profiles/${id}`);
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getFullProfile = async (id: string): Promise<{ profile: Profile; meets: Meet[] }> => {
  try {
    const result = await axios.get(`${API_URL}profiles/${id}/full`);
    const data = result.data;
    const formattedData: any = {
      profile: formatProfile(data.profile),
      meets: data.meets.map((meet: any) => formatMeet(meet)),
    };
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
