'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import CreateService from './CreateService';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getServices } from '@/services/service';
import Spinner from '@/components/ui/Spinner';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: services, isLoading } = useQuery('services', getServices);

  const handleActionClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Create a service" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} actionTitle="Create">
        <CreateService />
      </Modal>
      <Stack maxW="100%">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          You can create or customize your services here.
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
          {services?.map((service: any) => (
            <ServiceCard key={service._id} service={service} fromProfile={true} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Services;
