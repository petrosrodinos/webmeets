import { Address } from './profile';
import { Service } from './service';

export type MeetType = 'remote' | 'client-location' | 'in-person';

export interface NewMeet extends Address {
  name: string;
  description: string;
  images: File[];
  phone?: string;
  duration: number;
  maxParticipants: number;
  price: number;
  type: MeetType;
  [key: string]: any;
}

export interface Meet extends Address {
  id: string;
  name: string;
  description: string;
  phone?: string;
  duration: number;
  maxParticipants: number;
  images: { id: string; file: string }[];
  price: number;
  type: MeetType;
  service: Service;
  createdAt: string;
}
