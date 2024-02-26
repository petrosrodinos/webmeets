import {
  Box,
  HStack,
  Icon,
  List,
  useColorModeValue,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import Input from "components/ui/Input";
import { Chat, NewMessage, Message } from "interfaces/chat";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getChats, createMessage } from "services/chats";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "store/authStore";
import { LuSendHorizonal } from "react-icons/lu";
import Spinner from "components/ui/Spinner";

const UserMessages: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Chat["messages"]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: chats, isLoading } = useQuery<Chat[]>("chats", getChats);

  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation(
    ({ message, id }: { message: NewMessage; id: string }) =>
      createMessage(id, message)
  );

  const handleSelectedChat = async (chatId: string) => {
    const selectedChat = chats?.find((chat) => chat.id === chatId);
    setSelectedChat(selectedChat);
    navigate(`/user/messages/${chatId}`);
    setMessages(selectedChat?.messages || []);
    // console.log(selectedChat);
  };

  // console.log(selectedChat?.messages);

  const hadleMessageSend = () => {
    console.log("newMessage");
    if (newMessage.trim() === "") return;
    sendMessage(
      {
        message: {
          message: newMessage,
          senderId: userId,
        },
        id: selectedChat?.id || "",
      },
      {
        onSuccess: (data) => {
          const newMessage: Message = {
            message: data.message,
            senderId: {
              id: userId,
              firstname: data.senderId.firstname,
              lastname: data.senderId.lastname,
              avatar: data.senderId.avatar,
              email: data.senderId.email,
              phone: data.senderId.phone,
            },
          };
          setMessages((prev) => [...prev, newMessage]);
          setNewMessage("");
        },
      }
    );
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      hadleMessageSend();
    }
  };

  return (
    <>
      {<Spinner loading={isLoading}></Spinner>}
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"xs"}
        p={3}
        height={"88vh"}
      >
        <HStack spacing={15} alignItems="flex-start">
          <Box borderRight="1px solid gray" height={"85.5vh"} pr={3}>
            <Text
              size="md"
              style={{
                marginBottom: "15px",
              }}
              letterSpacing={1}
            >
              Messages({chats?.length})
            </Text>
            <Input placeholder="Search messages" icon={CiSearch} />
            <Box marginTop={4}>
              {chats?.map((chat, index) => (
                <List
                  key={index}
                  onClick={() => {
                    handleSelectedChat(chat.id);
                  }}
                  bg={
                    chat.id === selectedChat?.id
                      ? useColorModeValue("gray.100", "black")
                      : ""
                  }
                  borderRadius={5}
                  _hover={{
                    bg: useColorModeValue("gray.100", "black"),
                    // color: "black",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  p={2}
                >
                  <HStack>
                    <Icon boxSize={10}></Icon>
                    <div>
                      <Text
                        key={chat.id}
                        letterSpacing={1}
                        color="primary.700"
                        fontWeight="bold"
                      >
                        {chat.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={useColorModeValue("gray.500", "white")}
                      >
                        What is the latest with Chakra UI
                      </Text>
                    </div>
                  </HStack>
                </List>
              ))}
            </Box>
          </Box>
          <Box width="100%" height="100%">
            <VStack alignItems="space-between" height="100%">
              <VStack width="100%" alignItems="flex-start" height="80vh">
                {selectedChat?.messages.map((message, index) => (
                  <Box
                    key={index}
                    p={3}
                    rounded={"lg"}
                    boxShadow={"xs"}
                    mb={4}
                    bg={
                      message.senderId.id === userId
                        ? useColorModeValue("white", "gray.600")
                        : useColorModeValue("gray.100", "black")
                    }
                    alignSelf={message.senderId.id === userId ? "flex-end" : ""}
                    display="flex"
                  >
                    <Text>{message.message}</Text>
                  </Box>
                ))}
              </VStack>
              <HStack>
                <Input
                  placeholder="Send a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleEnterPress}
                  // rigthIcon={<LuSendHorizonal />}
                  // onClick={hadleMessageSend}
                ></Input>
                <IconButton
                  aria-label="Send message"
                  icon={<LuSendHorizonal />}
                  onClick={hadleMessageSend}
                  bg={"primary.500"}
                ></IconButton>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default UserMessages;
