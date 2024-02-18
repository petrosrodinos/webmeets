import { User } from "interfaces/user";
import { FC } from "react";

interface ParticipantsProps {
  participants: User[];
}

const Participants: FC<ParticipantsProps> = ({ participants }) => {
  return (
    <div>
      {participants.map((participant) => (
        <div key={participant.id}>
          {participant.firstname} {participant.lastname}
        </div>
      ))}
    </div>
  );
};

export default Participants;
