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
}

export interface Chat {
  name: string;
  id: string;
  members: User[];
  messages: Message[];
  createdAt: string;
  meet: Meet;
  profile: Profile;
}
