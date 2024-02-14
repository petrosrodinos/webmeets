import { FC } from "react";
import { useParams } from "react-router-dom";

const Statistics: FC = () => {
  const { id } = useParams();
  return <div>statistics {id}</div>;
};

export default Statistics;
