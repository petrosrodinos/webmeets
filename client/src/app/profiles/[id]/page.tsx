'use client';

import { FC, useState, useMemo } from 'react';
import { getFullProfile } from '@/services/profile';
import { useQuery } from 'react-query';
import { useParams } from 'next/navigation';
import Spinner from '@/components/ui/Spinner';
import { Avatar, Image, Box, SimpleGrid, useToast, useDisclosure, useColorModeValue, Text } from '@chakra-ui/react';
import MeetCard from '@/components/ui/MeetCard';
import { Meet } from '@/interfaces/meet';
import { authStore } from '@/store/authStore';
import CreateBooking from 'app/meets/[id]/CreateBooking';
import Rating from '@/components/ui/Rating';

const Profile: FC = () => {
  const { id } = useParams();
  const { isLoggedIn } = authStore((state) => state);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedMeet, setSelectedMeet] = useState<Meet>();

  const toast = useToast();

  const { data: profile, isLoading } = useQuery(['profile', id], () => getFullProfile(id as string));

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

      {profile && (
        <>
          {selectedMeet && <CreateBooking meet={selectedMeet} isOpen={isOpen} onClose={onClose} />}

          <Box position="relative">
            <Image src={profile.profile.banner} />
            <Avatar
              position="absolute"
              left="45%"
              bottom="-50px"
              border="1px solid white"
              width={200}
              height={200}
              src={profile.profile.avatar}
            />
          </Box>
          <Rating value={rating || 1} />
          <Box mt={70} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <Box>
              <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                Bio
              </Text>
              <Box>{profile.profile.bio}</Box>
              <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                Country
              </Text>
              <Box mt="1">{profile.profile.country}</Box>
              <Text fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                Address
              </Text>
              <Box mt="1">{profile.profile.address}</Box>
            </Box>
          </Box>
          <SimpleGrid mt={30} columns={{ sm: 2, md: 3 }} spacing={3}>
            {profile.meets?.map((meet: Meet) => (
              <MeetCard fromProfiles key={meet.id} meet={meet} handleBook={handleBook} />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Profile;
