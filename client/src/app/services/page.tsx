'use client';

import Modal from '../components/ui/Modal';
import { useState } from 'react';
import CreateService from './CreateService';
import ServiceCard from '../components/ui/ServiceCard';
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        You can create or customize your services here.
      </Text>
      <Button
        onClick={() => setIsModalOpen(true)}
        mt={5}
        rightIcon={<AiOutlineArrowRight />}
        colorScheme="teal"
        variant="outline"
      >
        Create
      </Button>
      <SimpleGrid mt={10} columns={{ sm: 2, md: 3 }} spacing={3}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </SimpleGrid>
      <Modal title="Create a service" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} actionTitle="Create">
        <CreateService />
      </Modal>
    </>
  );
};

export default Services;
