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
import { FC, useRef, useState } from 'react';
import { createBooking, bookingAvailability } from '@/services/booking';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BookingSchema } from '@/validation-schemas/booking';
import { BookingAvailability, BookingPeriod, NewBooking } from '@/interfaces/booking';
import Calendar from 'react-calendar';
import './style.css';
import AvailabilityPeriods from './AvailabilityPeriods';
interface CreateBookingProps {
  isOpen: boolean;
  onClose: () => void;
  meet: Meet;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateBooking: FC<CreateBookingProps> = ({ isOpen, onClose, meet }) => {
  const firstField = useRef();
  const [date, setDate] = useState<Value>(new Date());
  const [availablePeriods, setAvailablePeriods] = useState<BookingPeriod[]>();
  const toast = useToast();
  const { mutate: createBookingMutation, isLoading } = useMutation(createBooking);

  const { mutate: bookingAvailabilityMutation, isLoading: isFindingAvailability } = useMutation(bookingAvailability);

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
    console.log('data', data);
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
          reset();
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

  const handleDateChange = (date: any) => {
    const payload: BookingAvailability = {
      from: date[0].toISOString(),
      to: date[1].toISOString(),
      meetId: meet.id,
    };
    bookingAvailabilityMutation(payload, {
      onSuccess: (data: any) => {
        setAvailablePeriods(data);
      },
      onError: (error: any) => {
        toast({
          title: 'Could find available spots',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'info',
        });
      },
    });
    setDate(date);
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
                <Calendar className="date-picker" selectRange view="month" onChange={handleDateChange} value={date} />

                {/* <Input
                  label="Date"
                  placeholder="Enter Date"
                  error={errors.date?.message}
                  type="datetime-local"
                  register={register('date')}
                /> */}

                {availablePeriods && <AvailabilityPeriods onPeriodSelected={handlePeriodSelected} periods={availablePeriods} />}
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
