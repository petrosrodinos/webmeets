import { formatDate } from "@fullcalendar/core/index.js";
import { formatUser } from "./user";
import { formatMeet } from "./meet";

export const formatChat = (chat: any) => ({
  id: chat._id,
  members: chat.members.map((member: any) => formatUser(member)),
  messages: chat.messages,
  createdAt: formatDate(chat.createdAt),
  name: chat.name,
});
