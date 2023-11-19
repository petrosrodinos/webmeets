'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Settings from './Settings';
import { getMeet } from '@/services/meets';
import Bookings from './Bookings';
import Meet from './Details';
import Details from './Details';
import Statistics from './Statistics';
import Reviews from './Reviews';

const Service: FC = () => {
  const params = useParams();
  const { id } = params;

  const { data: meet } = useQuery(['meet', id], () => getMeet(id as string));
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Bookings</Tab>
          <Tab>Reviews</Tab>
          <Tab>Details</Tab>
          <Tab>Statistics</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Bookings />
          </TabPanel>

          <TabPanel>
            <Reviews />
          </TabPanel>
          <TabPanel>
            <Details />
          </TabPanel>
          <TabPanel>
            <Statistics />
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
