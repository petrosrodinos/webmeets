import { create } from 'zustand';
import { Meet } from './meet';
import { Profile } from './profile';
import { User } from './user';

export interface NewBooking {
  profileId: string;
  meetId: string;
  notes: string;
  date: Date;
  participants: number;
}

export interface Booking {
  id: string;
  user: User | null;
  profile: Profile | null;
  meet: Meet;
  notes: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
  participants: number;
  createdAt: string;
}
