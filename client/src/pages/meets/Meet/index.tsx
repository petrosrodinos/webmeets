import { FC } from "react";
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
import { useQuery } from "react-query";
import Spinner from "components/ui/Spinner";
import Carousel from "components/ui/Carousel";
import Rating from "components/ui/Rating";
import Tag from "components/ui/Tag";
import CreateBooking from "./CreateBooking";
import { authStore } from "store/authStore";
import { MeetTypes } from "enums/meet";
import { Link, useParams } from "react-router-dom";
import Reviews from "./Reviews";

const MeetPage: FC = () => {
  const { id } = useParams();
  const { isLoggedIn, profileId } = authStore((state) => state);
  const { data: meet, isLoading } = useQuery(["meet", id], () => getMeet(id as string));
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

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
                  <Link to={`/profiles/${meet?.profile?.id}`}>
                    <HStack mb={2} mt={2}>
                      <Avatar src={meet.profile?.avatar}></Avatar>
                      <Text
                        width="fit-content"
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
                    </HStack>
                  </Link>
                  <Tag maxWidth="fit-content" value={meet.category} />

                  <Rating value={meet.rating} />
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at
                      delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis porro,
                      quae, quisquam quos reprehenderit velit? Natus, totam.
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
            <Reviews />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MeetPage;
