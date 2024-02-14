import { FC } from "react";
import { useParams } from "react-router-dom";

const Bookings: FC = () => {
  const { id } = useParams();
  return <div>bookigns {id}</div>;
};

export default Bookings;
