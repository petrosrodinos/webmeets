import { Meet } from './meet';
import { Profile } from './profile';
import { User } from './user';
import { MeetTypes } from 'enums/meet';
import { Roles } from 'enums/roles';

export interface NewBooking {
  profileId: string;
  meetId: string;
  date: Date;
  location?: string;
  participants: {
    userId: string;
    notes: string;
  }[];
}

export interface Booking {
  id: string;
  profile: Profile | null;
  meet: Meet;
  location?: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
  participants: {
    id: string;
    user: User;
    notes?: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface EditBooking {
  notes?: string;
  location?: string;
  date?: string;
  bookingId: string;
}

export interface CancelBooking {
  bookingId: string;
  reason?: string;
  role: Roles;
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
