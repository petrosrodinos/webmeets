import { FC } from 'react';
import { Box, Heading, Text, Stack, Avatar, useColorModeValue, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Meet } from '@/interfaces/meet';
import Carousel from '../Carousel';
import Rating from '../Rating';
import Tag from '../Tag';
import { authStore } from '@/store/authStore';
import Link from 'next/link';

interface MeetCardProps {
  meet: Meet;
  fromProfile?: boolean;
  fromProfiles?: boolean;
  handleBook?: (meet: Meet) => void;
}

const MeetCard: FC<MeetCardProps> = ({ meet, fromProfile = false, fromProfiles = false, handleBook }) => {
  const { profileId } = authStore((state) => state);
  const router = useRouter();
  const { id, name, description, images, createdAt, price, maxParticipants, duration, category, rating, profile, user } = meet;

  // const handleVisitClick = () => {
  //   if (fromProfile) {
  //     router.push(`/profile/meets/${id}`);
  //   } else {
  //     router.push(`/meets/${id}`);
  //   }
  // };

  const getVisitUrl = () => {
    if (fromProfile) {
      return `/profile/meets/${id}`;
    } else {
      return `/meets/${id}`;
    }
  };

  // const handleUserClick = () => {
  //   router.push(`/profiles/${profile?.id}`);
  // };

  return (
    <Box
      maxW={'445px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      _hover={{
        cursor: 'pointer',
        boxShadow: '0px 1px 25px -5px pink, 0 10px 10px -5px pink',
      }}
    >
      {images.length > 0 && (
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Carousel images={images.map((image) => image.file)} />
        </Box>
      )}
      <Link href={getVisitUrl()}>
        <Stack>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text color={'primary.500'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
            ${price}
          </Text>
          <Tag maxWidth="fit-content" value={category} />
          <Rating value={rating} />
          <Text color={'gray.500'}>{description}</Text>
          <Text color={'gray.500'}>{duration} minutes</Text>
          <Text color={'gray.500'}>{maxParticipants} people</Text>
        </Stack>
        {/* {(!fromProfiles || !fromProfile) && (
          <Stack
            _hover={{
              cursor: 'pointer',
              backgroundColor: 'gray.100',
            }}
            mt={6}
            padding={1}
            rounded="md"
            direction={'row'}
            spacing={4}
            align={'center'}
            onClick={handleUserClick}
          >
            <Avatar src={profile?.avatar} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>
                {user?.firstname} {user?.lastname}
              </Text>
              <Text color={'gray.500'}>{createdAt}</Text>
            </Stack>
          </Stack>
        )} */}

        {/* <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={handleVisitClick}
            flex={1}
            rounded={'full'}
            bg={'primary.500'}
            color={'white'}
            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
            _hover={{
              bg: 'primary.600',
            }}
          >
            {fromProfile ? 'Manage' : 'Visit'}
          </Button>
          {!fromProfile && profileId != meet.profile?.id && (
            <Button
              color="primary.500"
              borderColor={'primary.500'}
              variant="outline"
              onClick={() => handleBook?.(meet)}
              flex={1}
              rounded={'full'}
            >
              Quick Book
            </Button>
          )}
        </Stack> */}
      </Link>
    </Box>
  );
};

export default MeetCard;
