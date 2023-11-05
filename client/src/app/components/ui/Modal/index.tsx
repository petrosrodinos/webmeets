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
} & React.ComponentProps<typeof ChakraModal>;

const Modal: FC<ModalProps> = ({ isOpen, title, children, actionTitle, onClose, onAction, ...rest }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {onAction && (
            <Button colorScheme="cyan" mr={3} onClick={onAction}>
              {actionTitle}
            </Button>
          )}
          <Button variant="ghost" colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
