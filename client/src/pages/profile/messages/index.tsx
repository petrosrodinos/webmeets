import { FC } from "react";
import { useQuery } from "react-query";
import { getChats } from "services/chats";

const ProfileMessages: FC = () => {
  const { data, isLoading } = useQuery("chats", getChats);

  console.log(data);
  return <div>ProfileMessages</div>;
};

export default ProfileMessages;
