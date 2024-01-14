import { create } from 'zustand';
import { Meet } from './meet';
import { Profile } from './profile';
import { User } from './user';
import { MeetTypes } from 'enums/meet';

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
  location?: string;
  date: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
  participants: number;
  createdAt: string;
}

export interface EditBooking {
  notes?: string;
  location?: string;
  date?: string;
  meetId: string;
}

export interface BookingAvailability {
  meetId: string;
  from: string;
  to: string;
  [key: string]: string;
}

export interface BookingPeriod {
  date: string;
  periods: {
    id: string;
    value: string;
  }[];
}

export interface BookingInfoItem {
  label: string;
  value: string;
  type?: MeetTypes;
}
