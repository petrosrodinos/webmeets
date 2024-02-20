import axios from "axios";
import { API_URL } from "constants/api";
import { createParams, getAuthHeaders, getHeaders } from "./utils/utils";
import { formatUser } from "./formatter/user";
import { User } from "interfaces/user";

export const getUser = async () => {
  try {
    const res = await axios.get(`${API_URL}users/me`, getAuthHeaders());
    return res.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getUsers = async (query: { [key: string]: string } = {}): Promise<User[]> => {
  try {
    const res = await axios.get(`${API_URL}users?${createParams(query)}`, getHeaders());
    const data = res.data;
    const formattedData = data.map((user: any) => formatUser(user));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const editUser = async (payload: any) => {
  try {
    console.log("payload", payload);
    const res = await axios.patch(`${API_URL}users`, payload, getHeaders());
    return res.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
