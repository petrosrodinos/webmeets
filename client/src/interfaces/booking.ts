import { create } from 'zustand';
import { Meet, MeetType } from './meet';
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
  type?: MeetType;
}
