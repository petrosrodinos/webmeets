import { getAuthState } from "../../store/authStore";

export const createParams = (params: { [key: string]: string }) => {
  return new URLSearchParams(params).toString();
};

export const getHeaders = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAuthState().token}`,
    },
  };
};

export const getAuthHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAuthState().token}`,
    },
  };
};
