import { FC } from 'react';
import { useParams } from 'next/navigation';

const Settings: FC = () => {
  const params = useParams();
  const { id } = params;
  return <div>settings {id}</div>;
};

export default Settings;
