import Input from "components/ui/Input";
import { User } from "interfaces/user";
import { FC, useState } from "react";
import { getUsers } from "services/user";
import { useMutation } from "react-query";
import Spinner from "components/ui/Spinner";
import Participants from "../Participants";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface ParticipantSearchProps {
  type: "webmeets" | "other";
  onParticipantSelect: (participant: User) => void;
}

const ParticipantSearch: FC<ParticipantSearchProps> = ({ onParticipantSelect, type }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const { mutate: getUsersMutation, isLoading: isGettingUsers } = useMutation(getUsers);

  const handlePhoneChange = (e: any) => {
    const { value } = e.target;
    if (value.length < 5) return;
    if (type === "webmeets") {
      getUsersMutation(
        { phone: value },
        {
          onSuccess: (data) => {
            setParticipants(data);
          },
        }
      );
    }
  };

  return (
    <div>
      <Input
        label="Phone number"
        placeholder="Enter client's number"
        type="tel"
        name="phone"
        required
        onChange={handlePhoneChange}
      />
      <Spinner loading={isGettingUsers} />
      {participants.length === 0 && (
        <Alert mt={5} status="warning">
          <AlertIcon />
          No users found.
        </Alert>
      )}
      <Participants participants={participants} onSelect={onParticipantSelect} />
    </div>
  );
};

export default ParticipantSearch;
