import { FC } from 'react';
import { useParams } from 'next/navigation';
import CreateService from '../../CreateService';

interface ServiceProps {}

export const Service: FC<ServiceProps> = () => {
  const { id } = useParams();
  return <CreateService isEditing={true} />;
};
