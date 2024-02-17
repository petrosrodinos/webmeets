import { Review } from "interfaces/review";
import { formatDate } from "lib/date";
import { formatUser } from "./user";
import { User } from "interfaces/user";

export const formatReview = (review: any): Review => {
  return {
    id: review._id,
    meetId: review.meetId,
    rating: review.rating,
    review: review.review,
    answer: review.answer,
    createdAt: formatDate(review.createdAt),
    user: formatUser(review.userId) as User,
  };
};
