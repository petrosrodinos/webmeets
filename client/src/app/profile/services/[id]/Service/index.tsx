import { FC } from 'react';

interface ServiceProps {
  serviceId: string;
}

export const Service: FC<ServiceProps> = ({ serviceId }) => {
  return <div>Service</div>;
};
