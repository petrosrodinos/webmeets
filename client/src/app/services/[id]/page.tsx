import { FC } from 'react';

export async function generateStaticParams() {
  return [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
  ];
}

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
