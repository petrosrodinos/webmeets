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
  Text,
} from '@chakra-ui/react';
import TextArea from '@/components/ui/TextArea';
import { FC, useRef } from 'react';
import { createBooking } from '@/services/booking';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BookingSchema } from '@/validation-schemas/booking';
import AvailabilityPeriods from './AvailabilityPeriods';
import './style.css';
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
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  const handleCreateBooking = (data: any) => {
    // return;
    createBookingMutation(
      {
        ...data,
        meetId: meet.id,
        profileId: meet?.profile?.id,
      },
      {
        onSuccess: (data: any) => {
          const paymentUrl = data.payment.url;
          window.open(paymentUrl, '_blank');
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

  const handlePeriodSelected = (date: string) => {
    setValue('date', date);
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
                <Text>Select a date to find you a booking</Text>

                {/* <Input
                  label="Date"
                  placeholder="Enter Date"
                  error={errors.date?.message}
                  type="datetime-local"
                  register={register('date')}
                /> */}

                <AvailabilityPeriods onPeriodSelected={handlePeriodSelected} meetId={meet?.id as string} />
                <TextArea label="Notes (Optional)" placeholder="Add some notes for the host" register={register('notes')} />

                <DrawerFooter borderTopWidth="1px">
                  <Button
                    _hover={{
                      bg: 'primary.600',
                    }}
                    mr={3}
                    onClick={handleCreateBooking}
                    textColor="white"
                    type="submit"
                    bg="primary.500"
                  >
                    Create
                  </Button>
                  <Button disabled={isLoading} variant="outline" onClick={onClose}>
                    Cancel
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
