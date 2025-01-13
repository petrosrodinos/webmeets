import { Meet } from "./meet";
import { Profile } from "./profile";
import { User } from "./user";

export interface NewChat {
  name: string;
  members: string[];
  message?: NewMessage;
  meetId?: string;
  bookingId?: string;
  profileId?: string;
}

export interface NewMessage {
  senderId: string;
  message: string;
}

export interface Message {
  sender: User;
  message: string;
  createdAt: string;
}

export interface Chat {
  name: string;
  id: string;
  members: User[];
  messages: Message[];
  meet: Meet;
  profile: Profile;
}
