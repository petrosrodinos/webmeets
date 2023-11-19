'use client';

import { FC, useState } from 'react';
import { Alert, AlertIcon, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getMeets } from '@/services/meets';
import Spinner from '@/components/ui/Spinner';
import MeetCard from '@/components/ui/MeetCard';
import { Meet } from '@/interfaces/meet';
import CreateBooking from './[id]/CreateBooking';

interface MeetsProps {}

const Meets: FC<MeetsProps> = () => {
  const { data: meets, isLoading } = useQuery(['meets'], () => getMeets());
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedMeet, setSelectedMeet] = useState<Meet>();

  const handleBook = (meet: Meet) => {
    setSelectedMeet(meet);
    onOpen();
  };

  return (
    <>
      {selectedMeet && <CreateBooking meet={selectedMeet} isOpen={isOpen} onClose={onClose} />}

      <Stack maxW="100%">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          You can find any meet you like here.
        </Text>
        <Spinner loading={isLoading} />
        {!meets && !isLoading && (
          <Alert status="warning">
            <AlertIcon />
            Could not find any meets.
          </Alert>
        )}
        <SimpleGrid mt={10} columns={{ sm: 2, md: 3 }} spacing={3}>
          {meets?.map((meet: Meet) => (
            <MeetCard key={meet.id} meet={meet} handleBook={handleBook} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Meets;
