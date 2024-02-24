import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Icon,
  List,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { Chat } from "interfaces/chat";
import { FC } from "react";
import { useQuery } from "react-query";
import { getChats } from "services/chats";

const UserMessages: FC = () => {
  const { data, isLoading } = useQuery<Chat[]>("chats", getChats);

  console.log(data);

  return (
    <div>
      <HStack spacing={15}>
        <Card>
          <CardHeader>
            <Heading size="md">Messages({data?.length})</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {data?.map((chat) => (
                <>
                  <HStack>
                    <Icon boxSize={10}></Icon>
                    <div>
                      {" "}
                      <Box key={chat.id}>{chat.name}</Box>
                      <Heading size="xs" textTransform="uppercase">
                        "message"
                      </Heading>
                    </div>
                  </HStack>
                </>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <div>message</div>
      </HStack>
    </div>
  );
};

export default UserMessages;
