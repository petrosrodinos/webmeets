import { Meet } from "interfaces/meet";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { FC } from "react";
import CreateBookingForm from "./CreateBookingForm";

interface CreateBookingProps {
  isOpen: boolean;
  onClose: () => void;
  meet: Meet;
}

const CreateBooking: FC<CreateBookingProps> = ({ isOpen, onClose, meet }) => {
  return (
    <>
      <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new booking</DrawerHeader>

          <DrawerBody>
            <CreateBookingForm meet={meet} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateBooking;
