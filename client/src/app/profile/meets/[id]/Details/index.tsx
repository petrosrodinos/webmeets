import { FC } from 'react';
import { useParams } from 'next/navigation';

const Details: FC = () => {
  const { id } = useParams();
  return <div>Details {id}</div>;
};

export default Details;
