import { getAuthHeaders, getHeaders } from "./utils/utils";
import axios from "axios";
import { formatProfile } from "./formatter/profile";
import { formatMeet } from "./formatter/meet";
import { API_URL } from "constants/api";
import { Meet } from "interfaces/meet";
import { CreateProfile, Profile, UpdateProfile } from "interfaces/profile";

export const createProfile = async (payload: CreateProfile) => {
  try {
    const result = await axios.post(`${API_URL}profiles`, payload, getHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editProfile = async (payload: UpdateProfile) => {
  try {
    const result = await axios.patch(
      `${API_URL}profiles/${payload.profileId}`,
      payload,
      getAuthHeaders()
    );
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
