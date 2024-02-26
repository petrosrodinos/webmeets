import axios from "axios";
import { getAuthHeaders } from "./utils/utils";
import { API_URL } from "constants/api";
import { formatChat } from "./formatter/chat";
import { Chat, NewChat, NewMessage } from "interfaces/chat";

export const getChats = async (): Promise<Chat[]> => {
  try {
    const result = await axios.get(`${API_URL}chats`, getAuthHeaders());
    const formattedData = result.data.map((chat: any) => formatChat(chat));
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getChat = async (id: string): Promise<Chat> => {
  try {
    const result = await axios.get(`${API_URL}chats/${id}`, getAuthHeaders());
    const formattedData = formatChat(result.data);
    return formattedData;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const createChat = async (payload: NewChat) => {
  try {
    const result = await axios.post(
      `${API_URL}chats`,
      payload,
      getAuthHeaders()
    );
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const createMessage = async (chatId: string, payload: NewMessage) => {
  try {
    const result = await axios.post(
      `${API_URL}chats/${chatId}/messages`,
      payload,
      getAuthHeaders()
    );
    return result.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
