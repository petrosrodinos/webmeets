import { Booking } from '@/interfaces/booking';
import { editBooking } from '@/services/booking';
import { EditBookingProfileSchema } from '@/validation-schemas/booking';
import { useToast, Stack, Text, Button, List, ListItem, Box, useColorModeValue, HStack, Avatar } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { formatDate } from '@/lib/date';

interface BookingInfoProps {
  booking: Booking;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking }) => {
  const toast = useToast();
  const [bookingInfo, setBookingInfo] = useState<any[]>();
  const { mutate: editBookingMutation, isLoading } = useMutation(editBooking);

  useEffect(() => {
    reset({
      date: new Date(booking.date).toISOString().slice(0, 16),
    });
  }, []);

  useEffect(() => {
    setBookingInfo([
      {
        label: 'Meet',
        value: booking.meet.name,
      },
      {
        label: 'Notes',
        value: booking.notes,
      },
      {
        label: 'Duration',
        value: booking.meet.duration,
      },
      {
        label: 'Participants',
        value: booking.participants,
      },
      {
        label: 'Created',
        value: formatDate(booking.createdAt),
      },
      {
        label: 'Meet URL',
        value: 'http:someurl',
      },
    ]);
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditBookingProfileSchema),
  });

  const handleEditBooking = (data: any) => {
    editBookingMutation(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Booking edited successfully',
            position: 'top',
            isClosable: true,
            status: 'success',
          });
        },
        onError: (error: any) => {
          toast({
            title: 'Could not edit booking',
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
    <form onSubmit={handleSubmit(handleEditBooking)}>
      <Stack spacing="20px">
        <Box
          display="flex"
          flexDirection="column"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={3}
        >
          <Avatar alignSelf="center" size="xl" src={booking?.user?.avatar} mb={4} />

          <List spacing={2}>
            {bookingInfo?.map((info) => (
              <ListItem key={info.label}>
                <HStack>
                  <Text fontWeight="bold">{info.label}:</Text>
                  <Text>{info.value}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
        <Input label="Date" error={errors.date?.message} type="datetime-local" register={register('date')} />
        <Button isLoading={isLoading} colorScheme="green" variant="solid" type="submit" maxWidth="100px">
          Save
        </Button>
        <Button colorScheme="red" variant="outline" onClick={handleCancelBooking}>
          Cancel Booking
        </Button>
      </Stack>
    </form>
  );
};

export default BookingInfo;
