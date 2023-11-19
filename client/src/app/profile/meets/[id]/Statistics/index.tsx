import { FC } from 'react';
import { useParams } from 'next/navigation';

const Statistics: FC = () => {
  const { id } = useParams();
  return <div>statistics {id}</div>;
};

export default Statistics;
