import { FC } from "react";

interface MeetProps {
  params: {
    id: string;
  };
}

const Meet: FC<MeetProps> = ({ params }) => {
  const id = params.id;
  return <div>meet: {id}</div>;
};

export default Meet;
