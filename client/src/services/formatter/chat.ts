import { formatDate } from "lib/date";
import { formatUser } from "./user";
import { formatMeet } from "./meet";
import { Chat } from "interfaces/chat";
import { formatProfile } from "./profile";
import { Profile } from "interfaces/profile";

export const formatChat = (chat: any): Chat => ({
  id: chat._id,
  members: chat.members.map((member: any) => formatUser(member)),
  messages: chat.messages.map((message: any) => ({
    sender: formatUser(message.senderId),
    message: message.message,
    createdAt: formatDate(message.createdAt, true),
  })),
  name: chat.name,
  meet: formatMeet(chat.meetId),
  profile: formatProfile(chat.profileId) as Profile,
});
