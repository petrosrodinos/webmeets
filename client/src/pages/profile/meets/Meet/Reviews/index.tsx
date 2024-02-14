import { FC } from "react";
import { useParams } from "react-router-dom";

const Reviews: FC = () => {
  const { id } = useParams();
  return <div>Reviews {id}</div>;
};

export default Reviews;
