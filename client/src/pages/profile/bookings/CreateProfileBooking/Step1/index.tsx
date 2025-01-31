import { Meet } from "interfaces/meet";
import { FC, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { authStore } from "store/authStore";
import { getMeets } from "services/meets";
import Spinner from "components/ui/Spinner";
import Select from "components/ui/Select";
import { OptionItem } from "interfaces/components";
import { FormLabel, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import ParticipantSearch from "./ParticipantSearch";
import { User } from "interfaces/user";
import Participants from "./Participants";

interface Step1Props {
  onParticipantSelect: (userId: string) => void;
  onParticipantRemove: (userId: string) => void;
  onMeetSelect: (meet: Meet) => void;
}

const Step1: FC<Step1Props> = ({ onParticipantSelect, onParticipantRemove, onMeetSelect }) => {
  const { userId } = authStore((state) => state);
  const [selectedParticipants, setSelectedParticipants] = useState<User[]>([]);

  const { data: meets, isLoading } = useQuery(["meets"], () => getMeets({ userId }));

  const handleMeetSelect = (e: any) => {
    const meetId = e.target.value;
    const selectedMeet = meets?.find((meet) => meet.id === meetId);
    onMeetSelect(selectedMeet as Meet);
  };

  const handleParticipantSelect = (participant: User) => {
    if (selectedParticipants.find((p) => p.id === participant.id)) return;
    setSelectedParticipants((prev) => [...prev, participant]);
    onParticipantSelect(participant.id);
  };

  const handleParticipantRemove = (userId: string) => {
    setSelectedParticipants((prev) => prev.filter((p) => p.id !== userId));
    onParticipantRemove(userId);
  };

  const meetOptions = useMemo(() => {
    return meets?.map((meet) => ({ value: meet.id, label: meet.name }));
  }, [meets]);

  return (
    <div>
      <Spinner loading={isLoading} />
      <Select
        onChange={handleMeetSelect}
        options={meetOptions as OptionItem[]}
        label="Meets"
        placeholder="Select meet"
      />
      <FormLabel mt={5}>Find participants</FormLabel>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Webmeets user</Tab>
          <Tab>Other</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ParticipantSearch type="webmeets" onParticipantSelect={handleParticipantSelect} />
          </TabPanel>
          <TabPanel>
            <ParticipantSearch type="other" onParticipantSelect={handleParticipantSelect} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {selectedParticipants.length > 0 && (
        <>
          <FormLabel mt={5}>Selected participants</FormLabel>
          <Participants participants={selectedParticipants} onRemove={handleParticipantRemove} />
        </>
      )}
    </div>
  );
};

export default Step1;
