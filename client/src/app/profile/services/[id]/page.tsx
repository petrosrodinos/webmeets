'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getService } from '@/services/service';
import Spinner from '@/app/components/ui/Spinner';
import Meets from './Meets';
import { Service as ServiceDetails } from './Service';

const Service: FC = () => {
  const params = useParams();
  const { id } = params;

  const { data: service, isLoading } = useQuery(['service', id], () => getService(id as string));
  return (
    <>
      <Spinner loading={isLoading} />
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Meets</Tab>
          <Tab>{service?.name || 'Service'}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Meets serviceId={id as string} />
          </TabPanel>
          <TabPanel>
            <ServiceDetails serviceId={service?.id as string} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Service;
