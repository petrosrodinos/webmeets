import {
  Box,
  HStack,
  Icon,
  List,
  useColorModeValue,
  Text,
  VStack,
} from "@chakra-ui/react";
import Input from "components/ui/Input";
import { Chat } from "interfaces/chat";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getChats } from "services/chats";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "store/authStore";
import { LuSendHorizonal } from "react-icons/lu";
import Spinner from "components/ui/Spinner";

const UserMessages: FC = () => {
  const { userId } = authStore((state) => state);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: chats, isLoading } = useQuery<Chat[]>("chats", getChats);

  const handleSelectedChat = async (chatId: string) => {
    const selectedChat = chats?.find((chat) => chat.id === chatId);
    setSelectedChat(selectedChat);
    navigate(`/user/messages/${chatId}`);
    // console.log(selectedChat);
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
                        ? useColorModeValue("white", "gray.900")
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
                  rigthIcon={<LuSendHorizonal />}
                ></Input>{" "}
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default UserMessages;
