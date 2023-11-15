'use client';

import Modal from '@/components/ui/Modal';
import { useState, FC } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getMeets } from '@/services/meets';
import Spinner from '@/components/ui/Spinner';
import CreateMeet from './CreateMeet';

interface MeetsProps {
  serviceId: string;
}

const Meets: FC<MeetsProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: meets, isLoading } = useQuery('meets', getMeets);

  return (
    <>
      <Modal title="Create a Meet" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} actionTitle="Create">
        <CreateMeet />
      </Modal>
      <Stack maxW="100%">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          You can create or customize your meets here.
        </Text>
        <Button
          onClick={() => setIsModalOpen(true)}
          mt={5}
          rightIcon={<AiOutlineArrowRight />}
          colorScheme="teal"
          variant="outline"
          maxW={100}
        >
          Create
        </Button>
        <Spinner loading={isLoading} />
        <SimpleGrid mt={10} columns={{ sm: 2, md: 3 }} spacing={3}>
          {meets?.map((service: any) => (
            <ServiceCard key={service._id} service={service} fromProfile={true} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Meets;
