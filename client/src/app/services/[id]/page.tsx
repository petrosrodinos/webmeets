import { FC } from 'react';

interface ServiceProps {
  params: {
    id: string;
  };
}

const Service: FC<ServiceProps> = ({ params }) => {
  const id = params.id;
  return <div>service: {id}</div>;
};

export default Service;
