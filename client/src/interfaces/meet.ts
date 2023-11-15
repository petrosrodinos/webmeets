import { Address } from './profile';

export interface Meet extends Address {
  name: string;
  description: string;
  images?: File[];
  phone?: string;
  duration: number;
  maxParticipants: number;
  price: number;
  isOnline: boolean;
  placeVisit?: boolean;
}
