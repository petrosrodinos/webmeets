import {
  Box,
  HStack,
  List,
  useColorModeValue,
  Text,
  VStack,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import Input from "components/ui/Input";
import { Chat as ChatProp, NewMessage } from "interfaces/chat";
import { FC, useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { getChats, createMessage } from "services/chats";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { authStore } from "store/authStore";
import { LuSendHorizonal } from "react-icons/lu";
import Spinner from "components/ui/Spinner";

const Chat: FC = () => {
  const { userId } = authStore((state) => state);
  const selectedChatRef = useRef<boolean>(false);

  const [selectedChat, setSelectedChat] = useState<ChatProp>();
  const [newMessage, setNewMessage] = useState<string>("");

  const navigate = useNavigate();

  const {
    data: chats,
    isLoading,
    refetch,
  } = useQuery<ChatProp[]>({
    queryKey: "chats",
    queryFn: getChats,
  });

  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation(
    ({ message, id }: { message: NewMessage; id: string }) =>
      createMessage(id, message)
  );

  const handleSelectedChat = async (chatId: string) => {
    const selectedChat = chats?.find((chat) => chat.id === chatId);
    setSelectedChat(selectedChat);
    navigate(`/user/messages/${chatId}`);
  };

  const hadleMessageSend = () => {
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
          setNewMessage("");
          refetch();
          setSelectedChat(data);
        },
      }
    );
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      hadleMessageSend();
    }
  };

  const hadleLastMessage = (chat: ChatProp) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage;
  };

  const getAvatar = (chat: any) => {
    if (chat?.meet.id && chat?.profile.id) return chat.profile?.avatar;
  };

  useEffect(() => {
    if (chats) {
      if (!selectedChatRef.current) {
        setSelectedChat(chats[0]);
        selectedChatRef.current = true;
      }
    }
  }, [chats]);

  console.log(selectedChat);
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
          <Box
            borderRight="1px solid gray"
            height={"85.5vh"}
            pr={3}
            overflowY="auto"
            width="50%"
          >
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
            <Box marginTop={4} pr={3} overflowY="auto">
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
                    <Avatar boxSize={10} src={getAvatar(chat)}></Avatar>
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
                        {chat.messages.length > 0
                          ? userId === hadleLastMessage(chat).sender.id
                            ? "You: " + hadleLastMessage(chat).message
                            : ""
                          : "No message yet"}
                      </Text>
                    </div>
                  </HStack>
                </List>
              ))}
            </Box>
          </Box>

          <Box width="100%" height="100%">
            <HStack pb={4}>
              <Avatar boxSize={6} src={getAvatar(selectedChat)}></Avatar>
              <Text letterSpacing={1} color="primary.700" fontWeight="bold">
                {selectedChat?.name}
              </Text>
            </HStack>
            <VStack alignItems="space-between" height="100%">
              <VStack
                width="100%"
                alignItems="flex-start"
                height="77vh"
                overflowY="auto"
                pr={3}
              >
                {selectedChat?.messages.map((message, index) => (
                  <Box
                    key={index}
                    p={3}
                    rounded={"lg"}
                    boxShadow={"xs"}
                    mb={4}
                    bg={
                      message.sender.id === userId
                        ? useColorModeValue("white", "gray.600")
                        : useColorModeValue("gray.100", "black")
                    }
                    alignSelf={message.sender.id === userId ? "flex-end" : ""}
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
                  onKeyDown={handleEnterPress}
                ></Input>
                <IconButton
                  aria-label="Send message"
                  icon={<LuSendHorizonal />}
                  onClick={hadleMessageSend}
                  bg={"primary.500"}
                  isLoading={isSendingMessage}
                ></IconButton>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default Chat;
