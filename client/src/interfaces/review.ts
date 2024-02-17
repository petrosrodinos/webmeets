import { User } from "./user";

export interface CreateReview {
  meetId: string;
  rating: number;
  review: string;
}

export interface Review {
  id: string;
  meetId: string;
  rating: number;
  review: string;
  answer?: string;
  createdAt: string;
  user: User;
}
