import { Booking } from '@/interfaces/booking';
import { editBooking } from '@/services/booking';
import { BookingSchema } from '@/validation-schemas/booking';
import { useToast, Stack, Text, Button, List, ListItem } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface BookingInfoProps {
  booking: Booking;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking }) => {
  const toast = useToast();
  const { mutate: editBookingMutation, isLoading } = useMutation(editBooking);

  useEffect(() => {
    reset({
      date: new Date(booking.date).toISOString().slice(0, 16),
    });
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  const handleCreateBooking = (data: any) => {
    editBookingMutation(
      {
        ...data,
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

  const handleCancelBooking = () => {
    editBookingMutation(
      {
        ...booking,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Booking cancelled successfully',
            description: "We've cancelled your booking for you.",
            position: 'top',
            isClosable: true,
            status: 'success',
          });
        },
        onError: (error: any) => {
          toast({
            title: 'Could not cancel booking',
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
    <form onSubmit={handleSubmit(handleCreateBooking)}>
      <Stack spacing="20px">
        <List spacing={2}>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Notes:
            </Text>{' '}
            {booking.notes}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Duration:
            </Text>{' '}
            {booking.meet.duration} minutes
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Participants:
            </Text>{' '}
            {booking.participants}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Meet:
            </Text>{' '}
            {booking.meet.name}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              URL:
            </Text>{' '}
            http:someurl
          </ListItem>
        </List>
        <Input label="Date" error={errors.date?.message} type="datetime-local" register={register('date')} />
        <Button colorScheme="red" variant="outline" mr={3} onClick={handleCancelBooking}>
          Cancel Booking
        </Button>
      </Stack>
    </form>
  );
};

export default BookingInfo;
