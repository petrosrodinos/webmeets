import { FC } from 'react';
import { useParams } from 'next/navigation';

const Bookings: FC = () => {
  const { id } = useParams();
  return <div>bookigns {id}</div>;
};

export default Bookings;
