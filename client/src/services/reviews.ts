import { getAuthHeaders } from "./utils/utils";
import axios from "axios";
import { API_URL } from "constants/api";
import { CreateReview, Review } from "interfaces/review";
import { formatReview } from "./formatter/review";

export const createReview = async (payload: CreateReview) => {
  try {
    const result = await axios.post(`${API_URL}reviews`, payload, getAuthHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getReviews = async (meetId: string): Promise<Review[]> => {
  try {
    const result = await axios.get(`${API_URL}reviews/${meetId}`);
    const data = result.data;
    const formattedData = data.map((review: any) => formatReview(review));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deleteReview = async (id: string) => {
  try {
    const result = await axios.delete(`${API_URL}reviews/${id}`, getAuthHeaders());
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
