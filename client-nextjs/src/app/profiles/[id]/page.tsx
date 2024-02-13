'use client';

import { FC, useState, useMemo } from 'react';
import { getFullProfile } from '@/services/profile';
import { useQuery } from 'react-query';
import { useParams } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import {
  Avatar,
  Image,
  Box,
  SimpleGrid,
  useToast,
  useDisclosure,
  useColorModeValue,
  Text,
  HStack,
  VStack,
  ListItem,
  List,
} from '@chakra-ui/react';
import MeetCard from '@/components/ui/MeetCard';
import { Meet } from '@/interfaces/meet';
import { authStore } from '@/store/authStore';
import CreateBooking from 'app/meets/[id]/CreateBooking';
import Rating from '@/components/ui/Rating';
import Tag from '@/components/ui/Tag';

interface ProfileInfo {
  label: string;
  value?: string;
}

const Profile: FC = () => {
  const { id } = useParams();
  const { isLoggedIn } = authStore((state) => state);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedMeet, setSelectedMeet] = useState<Meet>();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo[]>();
  const toast = useToast();

  const { data: profile, isLoading } = useQuery(['profile', id], () => getFullProfile(id as string), {
    onSuccess: (data) => {
      setProfileInfo([
        {
          label: 'Country',
          value: data.profile.country,
        },
        {
          label: 'Address',
          value: data.profile.address,
        },
        {
          label: 'City',
          value: data.profile.city,
        },
        {
          label: 'Area',
          value: data.profile.area,
        },
        {
          label: 'Postal Code',
          value: data.profile.postalCode,
        },
        {
          label: 'Phone',
          value: data.profile.phone,
        },
      ]);
    },
  });

  const handleBook = (meet: Meet) => {
    if (!isLoggedIn) {
      toast({
        title: 'Sign in to book this meet!',
        description: 'You need to be signed in to book this meet or create an account if you do not have one.',
        position: 'top',
        isClosable: true,
        status: 'warning',
      });
      return;
    }
    setSelectedMeet(meet);
    onOpen();
  };

  const rating = useMemo(() => {
    if (!profile?.meets) return;
    let rating = 0;
    profile?.meets?.forEach((meet) => {
      rating += meet.rating;
    });
    return rating / profile?.meets?.length || 1;
  }, [profile]);

  return (
    <>
      <Spinner loading={isLoading} />
      {selectedMeet && <CreateBooking meet={selectedMeet} isOpen={isOpen} onClose={onClose} />}

      {profile && (
        <Box>
          <Box bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} mt={3} rounded="lg">
            <VStack>
              <Image src={profile.profile.banner} />
              <VStack spacing={5} alignSelf="flex-start" mt={5} mb={5} ml={5}>
                <HStack spacing={5}>
                  <Avatar border="1px solid white" width={70} height={70} src={profile.profile.avatar} />
                  <VStack spacing={0}>
                    <Text width="100%" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                      {profile.profile.userId?.firstname + ' ' + profile.profile.userId?.lastname}
                    </Text>
                    <Rating value={rating || 1} />
                  </VStack>
                </HStack>
                <Text width="100%">{profile.profile.bio}</Text>
              </VStack>
            </VStack>
          </Box>
          <Box mt={3} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              Categories
            </Text>
            <SimpleGrid width="70%" columns={[3, null, 3]} spacing="5px">
              {profile.profile.categories.map((item, index) => (
                <Tag key={index} value={item} />
              ))}
            </SimpleGrid>
            <Box>
              <List>
                {profileInfo?.map((info, index) => {
                  return (
                    <div key={index}>
                      {info.value ? (
                        <ListItem>
                          <HStack>
                            <Text fontWeight="bold">{info.label}:</Text>
                            <Text>{info.value}</Text>
                          </HStack>
                        </ListItem>
                      ) : null}
                    </div>
                  );
                })}
              </List>
            </Box>
          </Box>
          <SimpleGrid mt={30} columns={{ sm: 2, md: 3 }} spacing={3}>
            {profile.meets?.map((meet: Meet) => (
              <MeetCard fromProfiles key={meet.id} meet={meet} handleBook={handleBook} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default Profile;
