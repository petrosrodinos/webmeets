'use client';
import { FC } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { getMeet } from '@/services/meets';
import { useQuery } from 'react-query';
import Spinner from '@/components/ui/Spinner';
import Carousel from '@/components/ui/Carousel';
import Rating from '@/components/ui/Rating';
import Tag from '@/components/ui/Tag';
import CreateBooking from './CreateBooking';

// export async function generateStaticParams() {
//   return [
//     {
//       id: '1',
//     },
//     {
//       id: '2',
//     },
//     {
//       id: '3',
//     },
//   ];
// }

interface MeetProps {
  params: {
    id: string;
  };
}

const Meet: FC<MeetProps> = ({ params }) => {
  const { id } = params;
  const { data: meet, isLoading } = useQuery(['meet', id], () => getMeet(id as string));
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container maxW={'7xl'}>
      <Spinner loading={isLoading} />
      {meet && (
        <>
          <CreateBooking meet={meet} isOpen={isOpen} onClose={onClose} />
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
            <Carousel images={meet.images.map((image) => image.file)} />
            <Stack spacing={{ base: 6, md: 1 }}>
              <Box as={'header'}>
                <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {meet.name}
                </Heading>
                <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize={'2xl'}>
                  ${meet.price}
                </Text>
                <Tag maxWidth="fit-content" value={meet.category} />
                <Rating value={meet.rating} />
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    alignSelf="flex-start"
                    color={useColorModeValue('gray.500', 'gray.400')}
                    fontSize={'2xl'}
                    fontWeight={'300'}
                  >
                    {meet.description}
                  </Text>
                  <Text fontSize={'lg'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at delectus doloribus dolorum
                    expedita hic, ipsum maxime modi nam officiis porro, quae, quisquam quos reprehenderit velit? Natus, totam.
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Features
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem> <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Meet Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Duration:
                      </Text>{' '}
                      {meet.duration} minutes
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Max Participants:
                      </Text>{' '}
                      {meet.maxParticipants}
                    </ListItem>
                    {meet.type == 'in-person' && (
                      <>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            City:
                          </Text>{' '}
                          {meet.city}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Area:
                          </Text>{' '}
                          {meet.area}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Address:
                          </Text>{' '}
                          {meet.address}
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Postal Code:
                          </Text>{' '}
                          {meet.postalCode}
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={useColorModeValue('gray.900', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                onClick={onOpen}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                BOOK NOW
              </Button>
            </Stack>
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Meet;
