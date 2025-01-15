import Modal from "components/ui/Modal";
import { useState, FC } from "react";
import { Alert, AlertIcon, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useQuery } from "react-query";
import { getMeets } from "services/meets";
import Spinner from "components/ui/Spinner";
import CreateMeet from "./CreateMeet";
import MeetCard from "components/ui/MeetCard";
import { Meet } from "interfaces/meet";
import { authStore } from "store/authStore";

interface MeetsProps {}

const ProfileMeets: FC<MeetsProps> = () => {
  const { userId } = authStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: meets, isLoading } = useQuery(["meets", userId], () => getMeets({ userId }));

  return (
    <>
      <Modal
        title="Create a Meet"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionTitle="Create"
      >
        <CreateMeet />
      </Modal>
      <Stack maxW="100%">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          You can create or customize your meets here.
        </Text>
        <Button
          onClick={() => setIsModalOpen(true)}
          mt={5}
          rightIcon={<AiOutlineArrowRight />}
          variant="outline"
          maxW={100}
          color="primary.500"
          borderColor={"primary.500"}
        >
          Create
        </Button>
        <Spinner loading={isLoading} />
        {!meets && !isLoading && (
          <Alert status="warning">
            <AlertIcon />
            Could not find any meets.
          </Alert>
        )}
        <SimpleGrid mt={10} columns={{ sm: 2, md: 3 }} spacing={3}>
          {meets?.map((meet: Meet) => (
            <MeetCard key={meet.id} meet={meet} fromProfile={true} />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default ProfileMeets;
