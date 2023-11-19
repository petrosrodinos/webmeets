'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Settings from './Settings';
import { getMeet } from '@/services/meets';

const Service: FC = () => {
  const params = useParams();
  const { id } = params;

  const { data: meet } = useQuery(['meet', id], () => getMeet(id as string));
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Bookings</Tab>
          <Tab>{meet?.name || 'Meet'}</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h1>bookings</h1>
          </TabPanel>
          <TabPanel>
            <h2>details</h2>
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Service;
