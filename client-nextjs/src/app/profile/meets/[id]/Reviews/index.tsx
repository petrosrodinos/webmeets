import { FC } from 'react';
import { useParams } from 'next/navigation';

const Reviews: FC = () => {
  const { id } = useParams();
  return <div>Reviews {id}</div>;
};

export default Reviews;
