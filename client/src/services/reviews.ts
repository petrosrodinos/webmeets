import { getAuthHeaders } from "./utils/utils";
import axios from "axios";
import { API_URL } from "constants/api";
import { CreateReview, Review } from "interfaces/review";
import { formatReview } from "./formatter/review";
import { createParams } from "./utils/utils";

export const createReview = async (payload: CreateReview) => {
  try {
    const result = await axios.post(
      `${API_URL}reviews`,
      payload,
      getAuthHeaders()
    );
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getReviews = async (query: {
  [key: string]: string;
}): Promise<Review[]> => {
  try {
    const result = await axios.get(`${API_URL}reviews?${createParams(query)}`);
    const formattedData = result.data.map((review: any) =>
      formatReview(review)
    );
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const deleteReview = async (id: string) => {
  try {
    const result = await axios.delete(
      `${API_URL}reviews/${id}`,
      getAuthHeaders()
    );
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
