import { formatDate } from "@fullcalendar/core/index.js";
import { formatUser } from "./user";
import { formatMeet } from "./meet";
import { Chat } from "interfaces/chat";
import { formatBooking } from "./booking";
import { formatProfile } from "./profile";
import { Profile } from "interfaces/profile";

export const formatChat = (chat: any): Chat => ({
  id: chat._id,
  members: chat.members.map((member: any) => formatUser(member)),
  messages: chat.messages.map((message: any) => ({
    ...message,
    sender: formatUser(message.senderId),
  })),
  createdAt: formatDate(chat.createdAt),
  name: chat.name,
  meet: formatMeet(chat.meetId),
  profile: formatProfile(chat.profileId) as Profile,
});
