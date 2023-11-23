import { Meet } from '@/interfaces/meet';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  useToast,
  DrawerFooter,
} from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { FC, useRef } from 'react';
import { createBooking } from '@/services/booking';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BookingSchema } from '@/validation-schemas/booking';
import NumberInput from '@/components/ui/NumberInput';
interface CreateBookingProps {
  isOpen: boolean;
  onClose: () => void;
  meet: Meet;
}

const CreateBooking: FC<CreateBookingProps> = ({ isOpen, onClose, meet }) => {
  const firstField = useRef();
  const toast = useToast();
  const { mutate: createBookingMutation, isLoading } = useMutation(createBooking);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  const handleCreateBooking = (data: any) => {
    createBookingMutation(
      {
        ...data,
        meetId: meet.id,
        profileId: meet?.profile?.id,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Booking created successfully',
            description: "We've created your booking for you.",
            position: 'top',
            isClosable: true,
            status: 'success',
          });
          onClose();
        },
        onError: (error: any) => {
          toast({
            title: 'Could not create booking',
            description: error.message,
            position: 'top',
            isClosable: true,
            status: 'error',
          });
        },
      },
    );
  };

  return (
    <>
      <Drawer size="md" isOpen={isOpen} placement="right" initialFocusRef={firstField.current} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new booking</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(handleCreateBooking)}>
              <Stack spacing="20px">
                <NumberInput
                  min={1}
                  max={meet.maxParticipants}
                  error={errors.participants?.message}
                  label="Participants"
                  register={register('participants')}
                />

                <Input
                  label="Date"
                  placeholder="Enter Date"
                  error={errors.date?.message}
                  type="datetime-local"
                  register={register('date')}
                />

                <TextArea label="Notes" placeholder="Add some notes" register={register('notes')} />

                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBooking} type="submit" colorScheme="blue">
                    Create
                  </Button>
                </DrawerFooter>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateBooking;
