'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button, Center, Text, VStack } from '@chakra-ui/react';

const BookingStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  const handleNavigate = () => {
    router.push('/bookings/user');
  };

  return (
    <Center h="80vh">
      <VStack spacing={4}>
        {success && <Text color="black.500">Booking created successfully!</Text>}
        {success && (
          <Button
            onClick={handleNavigate}
            bg={'primary.500'}
            color={'white'}
            _hover={{
              bg: 'primary.600',
            }}
          >
            Visit your bookings
          </Button>
        )}
        {canceled && <Text color="red.500">There was a problem creating your booking try again</Text>}
      </VStack>
    </Center>
  );
};

export default BookingStatus;
