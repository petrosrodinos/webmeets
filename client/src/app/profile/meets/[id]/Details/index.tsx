import { FC } from 'react';
import { Meet } from '@/interfaces/meet';
import CreateMeet from '../../CreateMeet';

interface DetailsProps {
  meet: Meet;
}

const Details: FC<DetailsProps> = ({ meet }) => {
  return <CreateMeet meet={meet} />;
};

export default Details;
