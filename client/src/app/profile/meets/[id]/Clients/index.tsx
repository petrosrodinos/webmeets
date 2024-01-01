import { Meet } from '@/interfaces/meet';
import { FC } from 'react';

interface ClientsProps {
  meet: Meet | undefined;
}

const Clients: FC<ClientsProps> = () => {
  return <div>clients</div>;
};

export default Clients;
