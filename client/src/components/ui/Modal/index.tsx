import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal as ChakraModal,
} from '@chakra-ui/react';
import { FC } from 'react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose?: () => void;
  onAction?: () => void;
  actionTitle?: string;
  closeTitle?: string;
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({ isOpen, title, children, actionTitle, closeTitle = 'Cancel', onClose, onAction, ...rest }) => {
  return (
    <ChakraModal size={'xl'} isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent maxH="800px" overflow="auto">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {onAction && (
            <Button bg="primary.500" textColor="white" mr={3} onClick={onAction}>
              {actionTitle}
            </Button>
          )}
          <Button variant="ghost" colorScheme="red" onClick={onClose}>
            {closeTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
