import { FC } from 'react';
import { useParams } from 'next/navigation';

const Settings: FC = () => {
  const { id } = useParams();
  return <div>settings {id}</div>;
};

export default Settings;
