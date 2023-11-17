'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getService } from '@/services/service';
import Meets from './Meets';
import { Service as ServiceDetails } from './Service';
import Settings from './Settings';

const Service: FC = () => {
  const params = useParams();
  const { id } = params;

  const { data: service } = useQuery(['service', id], () => getService(id as string));
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Meets</Tab>
          <Tab>{service?.name || 'Service'}</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Meets />
          </TabPanel>
          <TabPanel>
            <ServiceDetails serviceId={service?.id as string} />
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
