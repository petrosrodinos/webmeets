import Modal from '@/components/ui/Modal';
import { Button, useToast } from '@chakra-ui/react';
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
      <Button width="100%" colorScheme="red" variant="outline" onClick={toggleCancelModal}>
        Cancel Meet
      </Button>
    </div>
  );
};

export default Settings;
