'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Settings from './Settings';
import { getMeet } from '@/services/meets';
import Bookings from './Bookings';
import Details from './Details';
import Statistics from './Statistics';
import Reviews from './Reviews';
import Spinner from '@/components/ui/Spinner';

const Service: FC = () => {
  const { id } = useParams();

  const { data: meet, isLoading } = useQuery(['meet', id], () => getMeet(id as string));
  return (
    <>
      <Spinner loading={isLoading} />
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Details</Tab>
          <Tab>Bookings</Tab>
          <Tab>Reviews</Tab>
          <Tab>Statistics</Tab>
          {/* <Tab>clients</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Details meet={meet} />
          </TabPanel>
          <TabPanel>
            <Bookings />
          </TabPanel>

          <TabPanel>
            <Reviews />
          </TabPanel>

          <TabPanel>
            <Statistics />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Service;
