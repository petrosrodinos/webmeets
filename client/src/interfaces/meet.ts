import { Address, Profile } from './profile';
import { User } from './user';

export type MeetType = 'remote' | 'client-location' | 'in-person';

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
  maxParticipants: number;
  price: number;
  type: MeetType;
  hours: Hours[];
  closingPeriods: ClosingPeriod[];
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
  type: MeetType;
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
