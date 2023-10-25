import { FC } from "react";

export async function generateStaticParams() {
  return [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
  ];
}

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
