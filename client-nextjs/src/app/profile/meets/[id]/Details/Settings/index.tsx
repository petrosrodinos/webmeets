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
  HStack,
} from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { deleteMeet, editMeet } from '@/services/meets';
import { useRouter } from 'next/navigation';
import { EditMeet, Meet } from '@/interfaces/meet';
import { VisibilityTypes } from 'enums/meet';

interface SettingsProps {
  meet?: Meet;
}

const Settings: FC<SettingsProps> = ({ meet }) => {
  const toast = useToast();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(meet?.visibility === VisibilityTypes.PUBLIC);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { mutate: deleteMeetMutation, isLoading: isDeleting } = useMutation(deleteMeet);
  const { mutate: editMeetMutation } = useMutation((data: EditMeet) => editMeet(meet?.id as string, data));

  useEffect(() => {
    setIsPublic(meet?.visibility === VisibilityTypes.PUBLIC);
  }, [meet]);

  const handleVisibilityChange = async () => {
    setIsPublic(!isPublic);

    editMeetMutation(
      {
        visibility: !isPublic ? VisibilityTypes.PUBLIC : VisibilityTypes.PRIVATE,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Meet updated',
            status: 'success',
            isClosable: true,
            position: 'top',
          });
        },
        onError: () => {
          toast({
            title: 'Could not update your meet',
            status: 'error',
            isClosable: true,
            position: 'top',
          });
        },
      },
    );
  };

  const handleDeleteMeet = async () => {
    if (!meet) return;
    deleteMeetMutation(meet.id, {
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
                <Switch isChecked={isPublic} onChange={handleVisibilityChange} colorScheme="pink" size="lg" />
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
