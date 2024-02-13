import { MeetTypes, VisibilityTypes } from 'enums/meet';
import { Address, Profile } from './profile';
import { User } from './user';

export interface Period {
  id: string;
  from: string;
  to: string;
}

export interface Hours {
  id: string;
  day: string;
  periods: Period[];
}

export interface ClosingPeriod {
  id: string;
  name: string;
  description?: string;
  from: string;
  to: string;
}

export interface NewMeet extends Address {
  name: string;
  description: string;
  images: File[];
  category: string;
  phone?: string;
  duration: number;
  visibility: VisibilityTypes;
  maxParticipants: number;
  price: number;
  type: MeetTypes;
  hours: Hours[];
  [key: string]: any;
}

export interface EditMeet extends Address {
  name?: string;
  description?: string;
  images?: File[];
  category?: string;
  phone?: string;
  duration?: number;
  visibility?: VisibilityTypes;
  maxParticipants?: number;
  price?: number;
  type?: MeetTypes;
  hours?: Hours[];
  [key: string]: any;
}

export interface Meet extends Address {
  id: string;
  name: string;
  description: string;
  category: string;
  phone?: string;
  duration: number;
  rating: number;
  maxParticipants: number;
  images: { id: string; file: string }[];
  price: number;
  hours: Hours[];
  closingPeriods: ClosingPeriod[];
  type: MeetTypes;
  profile: Profile | null;
  user: User | null;
  createdAt: string;
  [key: string]: any;
}

export interface AddPeriod {
  meetId: string;
  hourId: string;
  from: string;
  to: string;
}

export interface EditPeriod {
  meetId: string;
  hourId: string;
  periodId: string;
  from: string;
  to: string;
}

export interface DeletePeriod {
  meetId: string;
  hourId: string;
  periodId: string;
}

export interface AddClosingPeriod {
  meetId: string;
  name: string;
  description?: string;
  from: string;
  to: string;
}

export interface EditClosingPeriod {
  meetId: string;
  closingPeriodId: string;
  name: string;
  description?: string;
  from: string;
  to: string;
}

export interface DeleteClosingPeriod {
  meetId: string;
  closingPeriodId: string;
}

export interface AddImages {
  meetId: string;
  images: File[];
}

export interface DeleteImages {
  meetId: string;
  images: string[];
}
