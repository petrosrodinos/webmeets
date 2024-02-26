import { FC, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  StackDivider,
  List,
  ListItem,
  useColorModeValue,
  useDisclosure,
  useToast,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { getMeet } from "services/meets";
import { useMutation, useQuery } from "react-query";
import Spinner from "components/ui/Spinner";
import Carousel from "components/ui/Carousel";
import Rating from "components/ui/Rating";
import Tag from "components/ui/Tag";
import CreateBooking from "./CreateBooking";
import { authStore } from "store/authStore";
import { MeetTypes } from "enums/meet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reviews from "./Reviews";
import { LuSend } from "react-icons/lu";
import { createChat } from "services/chats";
import { NewChat } from "interfaces/chat";

const MeetPage: FC = () => {
  const { id } = useParams();
  const { isLoggedIn, profileId, userId } = authStore((state) => state);

  const { mutate: createChatMutation } = useMutation(createChat);

  const { data: meet, isLoading } = useQuery(["meet", id], () =>
    getMeet(id as string)
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const navigate = useNavigate();

  const handleBook = () => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in to book this meet!",
        description:
          "You need to be signed in to book this meet or create an account if you do not have one.",
        position: "top",
        isClosable: true,
        status: "warning",
      });
      return;
    }
    onOpen();
  };

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      toast({
        title: "Sign in to send a message!",
        description:
          "You need to be signed in to send a message or create an account if you do not have one.",
        position: "top",
        isClosable: true,
        status: "warning",
      });
      return;
    }
    createChatMutation({
      members: [meet?.user?.id, userId],
      name: meet?.name,
      meetId: meet?.id,
      profileId: meet?.profile?.id,
    } as NewChat);
    navigate(`/user/messages`);
  };

  return (
    <Container maxW={"7xl"}>
      <Spinner loading={isLoading} />
      {meet && (
        <>
          <CreateBooking meet={meet} isOpen={isOpen} onClose={onClose} />
          <Stack flexDirection={{ base: "column", lg: "row" }}>
            <VStack minW="70%" width="100%">
              <Carousel images={meet.images.map((image) => image.file)} />
              <Stack spacing={{ base: 6, md: 1 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {meet.name}
                  </Heading>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={300}
                    fontSize={"2xl"}
                  >
                    ${meet.price}
                  </Text>
                  <Button
                    borderColor={"primary.500"}
                    color={"primary.500"}
                    _hover={{
                      bg: "primary.600",
                      color: "white",
                    }}
                    height={"30px"}
                    variant={"outline"}
                    rightIcon={<LuSend />}
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </Button>
                  <HStack mb={2} mt={2}>
                    <Avatar src={meet.profile?.avatar}></Avatar>
                    <Link
                      style={{ maxWidth: "min-content" }}
                      to={`/profiles/${meet?.profile?.id}`}
                    >
                      <Text
                        width="max-content"
                        mb={1}
                        height="max-content"
                        p={1}
                        _hover={{
                          cursor: "pointer",
                        }}
                        color="primary.500"
                        fontSize={{ base: "16px", lg: "18px" }}
                        fontWeight={"500"}
                      >
                        {meet.user?.firstname} {meet.user?.lastname}
                      </Text>
                    </Link>
                  </HStack>
                  <Tag maxWidth="fit-content" value={meet.category} />

                  <Rating value={meet.rating} />
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  }
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text
                      alignSelf="flex-start"
                      color={useColorModeValue("gray.500", "gray.400")}
                      fontSize={"2xl"}
                      fontWeight={"300"}
                    >
                      {meet.description}
                    </Text>
                    <Text fontSize={"lg"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ad aliquid amet at delectus doloribus dolorum expedita
                      hic, ipsum maxime modi nam officiis porro, quae, quisquam
                      quos reprehenderit velit? Natus, totam.
                    </Text>
                  </VStack>
                  {/* <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Features
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                      <List spacing={2}>
                        <ListItem>Chronograph</ListItem>
                        <ListItem>Master Chronometer Certified</ListItem>{" "}
                        <ListItem>Tachymeter</ListItem>
                      </List>
                      <List spacing={2}>
                        <ListItem>Anti‑magnetic</ListItem>
                        <ListItem>Chronometer</ListItem>
                        <ListItem>Small seconds</ListItem>
                      </List>
                    </SimpleGrid>
                  </Box> */}
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Meet Info
                    </Text>

                    <List spacing={2}>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Duration:
                        </Text>{" "}
                        {meet.duration} minutes
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Max Participants:
                        </Text>{" "}
                        {meet.maxParticipants}
                      </ListItem>
                      {meet.type == MeetTypes.IN_PERSON && (
                        <>
                          <ListItem>
                            <Text as={"span"} fontWeight={"bold"}>
                              City:
                            </Text>{" "}
                            {meet.city}
                          </ListItem>
                          <ListItem>
                            <Text as={"span"} fontWeight={"bold"}>
                              Area:
                            </Text>{" "}
                            {meet.area}
                          </ListItem>
                          <ListItem>
                            <Text as={"span"} fontWeight={"bold"}>
                              Address:
                            </Text>{" "}
                            {meet.address}
                          </ListItem>
                          <ListItem>
                            <Text as={"span"} fontWeight={"bold"}>
                              Postal Code:
                            </Text>{" "}
                            {meet.postalCode}
                          </ListItem>
                        </>
                      )}
                    </List>
                  </Box>
                </Stack>

                {meet?.profile?.id !== profileId && (
                  <Button
                    rounded={"lg"}
                    w={"full"}
                    mt={8}
                    size={"lg"}
                    py={"7"}
                    textTransform={"uppercase"}
                    onClick={handleBook}
                    bg={"primary.500"}
                    color={"white"}
                    _hover={{
                      bg: "primary.600",
                    }}
                  >
                    BOOK NOW
                  </Button>
                )}
              </Stack>
            </VStack>
            <Reviews meet={meet} />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MeetPage;
