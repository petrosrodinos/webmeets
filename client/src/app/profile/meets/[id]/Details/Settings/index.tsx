import Modal from '@/components/ui/Modal';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  useToast,
  Text,
  Switch,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { deleteMeet } from '@/services/meets';
import { useRouter } from 'next/navigation';

interface SettingsProps {
  meetId?: string;
}

const Settings: FC<SettingsProps> = ({ meetId }) => {
  const toast = useToast();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { mutate: deleteMeetMutation, isLoading: isDeleting } = useMutation(deleteMeet);

  const handleDeleteMeet = async () => {
    if (!meetId) return;
    deleteMeetMutation(meetId, {
      onSuccess: () => {
        toast({
          title: 'Meet deleted',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        router.push('/profile/meets');
      },
      onError: () => {
        toast({
          title: 'Could not delete your meet',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      },
    });
  };
  const toggleCancelModal = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  };

  return (
    <div>
      <Modal
        isOpen={isCancelModalOpen}
        onClose={toggleCancelModal}
        title="Delete Meet"
        actionTitle="Delete"
        onAction={handleDeleteMeet}
        actionTitleLoading={isDeleting}
      >
        <h1>Are you sure you want to delete this meet?</h1>
      </Modal>
      <Card>
        <CardHeader>
          <Heading size="md">Meet Settings</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <HStack justifyContent="space-between">
                <Heading size="xs" textTransform="uppercase">
                  Visibility
                </Heading>
                <Switch isChecked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} colorScheme="pink" size="lg" />
              </HStack>

              <Text pt="2" fontSize="sm">
                Make your meet public or private to the world.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Button mt={10} width="100%" colorScheme="red" variant="outline" onClick={toggleCancelModal}>
        Delete Meet
      </Button>
    </div>
  );
};

export default Settings;
