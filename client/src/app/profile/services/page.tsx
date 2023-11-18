'use client';

import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import CreateService from './CreateService';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getServices } from '@/services/service';
import Spinner from '@/components/ui/Spinner';
import { Service } from '@/interfaces/service';
import { authStore } from '@/store/authStore';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = authStore((state) => state);

  const { data: services, isLoading } = useQuery('services', () => getServices({ userId }));

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
          {services?.map((service: Service) => (
            <ServiceCard key={service.id} service={service} fromProfile={true} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default Services;
