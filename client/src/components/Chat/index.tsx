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
  const { userId, profileId } = authStore((state) => state);
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

  const handleLastMessage = (chat: ChatProp) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage;
  };

  const getAvatar = (chat: any) => {
    if (chat?.meet.id) {
      if (chat?.profile.id !== profileId) {
        return chat.profile?.avatar;
      } else {
        const user = chat?.members.filter(
          (member: any) => member.id !== userId
        );
        return user[0]?.avatar;
      }
    }
  };

  const getChatName = (chat: any) => {
    if (chat?.meet.id) {
      const name = chat?.members.filter((member: any) => member.id !== userId);
      return (
        chat.meet.name + " - " + name[0]?.firstname + " " + name[0]?.lastname
      );
    }
  };

  useEffect(() => {
    if (chats) {
      if (!selectedChatRef.current) {
        setSelectedChat(chats[0]);
        selectedChatRef.current = true;
      }
    }
  }, [chats]);

  // useEffect(() => {
  //   let lastMessage: any = document?.getElementById?.(
  //     `${selectedChat?.messages[selectedChat?.messages.length - 1]}`
  //   );
  //   if (!lastMessage) return;
  //   lastMessage.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // }, [selectedChat?.messages]);

  console.log(selectedChat);
  return (
    <>
      <Spinner loading={isLoading}></Spinner>
      {!isLoading && (
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xs"}
          p={3}
          height={"88vh"}
        >
          <HStack alignItems="flex-start" gap={0}>
            <Box
              borderRight="1px solid  #e6e6e6"
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
                          {getChatName(chat)}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={useColorModeValue("gray.500", "white")}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {chat.messages.length > 0
                            ? userId === handleLastMessage(chat).sender.id
                              ? "You: " + handleLastMessage(chat).message
                              : handleLastMessage(chat).message
                            : "No message yet"}
                        </Text>
                      </div>
                    </HStack>
                  </List>
                ))}
              </Box>
            </Box>

            <Box width="100%" height="100%">
              <HStack pb={4} borderBottom={"1px solid #e6e6e6"} p={2}>
                <Avatar boxSize={6} src={getAvatar(selectedChat)}></Avatar>
                <Text letterSpacing={1} color="primary.700" fontWeight="bold">
                  {getChatName(selectedChat)}
                </Text>
              </HStack>
              <VStack alignItems="space-between" height="100%">
                <VStack
                  width="100%"
                  alignItems="flex-start"
                  height="77vh"
                  overflowY="auto"
                >
                  {selectedChat?.messages.map((message, index) => (
                    <HStack
                      p={3}
                      alignItems="flex-start"
                      height="100%"
                      alignSelf={message.sender.id === userId ? "flex-end" : ""}
                      flexDirection={
                        message.sender.id === userId ? "row-reverse" : "row"
                      }
                      mb={4}
                    >
                      <Avatar boxSize={6} mt={"2px"}></Avatar>
                      <VStack height={"100%"} alignItems="flex-start" gap={0}>
                        <Box
                          key={index}
                          p={3}
                          maxWidth={"220px"}
                          rounded={"lg"}
                          boxShadow={"xs"}
                          bg={
                            message.sender.id === userId
                              ? useColorModeValue("white", "gray.600")
                              : useColorModeValue("gray.100", "primary.500")
                          }
                          display="flex"
                        >
                          <Text maxWidth={"220px"} width={"100%"}>
                            {message.message}
                          </Text>
                        </Box>
                        <Text color={useColorModeValue("gray.400", "gray.500")}>
                          sss
                        </Text>
                      </VStack>
                    </HStack>
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
                    icon={<LuSendHorizonal color={"white"} />}
                    onClick={hadleMessageSend}
                    bg={"primary.500"}
                    isLoading={isSendingMessage}
                    _hover={{
                      bg: useColorModeValue("primary.600", "black"),
                      cursor: "pointer",
                    }}
                  ></IconButton>
                </HStack>
              </VStack>
            </Box>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default Chat;
