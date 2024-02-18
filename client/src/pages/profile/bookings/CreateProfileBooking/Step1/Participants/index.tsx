import { HStack, Avatar, Text, Box, useColorModeValue, VStack } from "@chakra-ui/react";
import { User } from "interfaces/user";
import { FC } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface ParticipantsProps {
  participants: User[];
  onSelect?: (participant: User) => void;
  onRemove?: (id: string) => void;
}

const Participants: FC<ParticipantsProps> = ({ participants, onSelect, onRemove }) => {
  return (
    <div>
      {participants.map((participant) => (
        <Box
          onClick={() => onSelect?.(participant)}
          mt={3}
          display="flex"
          flexDirection="column"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={3}
          _hover={
            onSelect
              ? {
                  cursor: "pointer",
                  bg: useColorModeValue("gray.100", "gray.600"),
                }
              : {}
          }
        >
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Avatar size="xs" name={participant.firstname} src={participant.avatar} />
              <VStack alignItems={"flex-start"} gap={0}>
                <Text fontWeight={"500"}>
                  {participant.firstname} {participant.lastname}
                </Text>
                <VStack>
                  <Text>{participant.phone}</Text>
                </VStack>
              </VStack>
            </HStack>
            {onRemove && (
              <FaRegTrashAlt
                style={{ cursor: "pointer" }}
                color="red"
                onClick={() => onRemove(participant.id)}
              />
            )}
          </HStack>
        </Box>
      ))}
    </div>
  );
};

export default Participants;
