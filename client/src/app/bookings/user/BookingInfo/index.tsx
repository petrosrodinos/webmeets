import { Booking } from '@/interfaces/booking';
import { editBooking } from '@/services/booking';
import { EditBookingUserSchema } from '@/validation-schemas/booking';
import { useToast, Stack, Text, Button, List, ListItem, Box, useColorModeValue, HStack } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import NumberInput from '@/components/ui/NumberInput';
import TextArea from '@/components/ui/TextArea';

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
      participants: String(booking.participants),
      notes: booking.notes,
    });
  }, []);

  useEffect(() => {
    setBookingInfo([
      {
        label: 'Booking Creation Date',
        value: booking.createdAt,
      },
      {
        label: 'Phone Number',
        value: booking?.profile?.phone,
      },
      {
        label: 'Name',
        value: booking?.meet?.name,
      },
      {
        label: 'City',
        value: booking?.meet?.city,
      },
      {
        label: 'Address',
        value: booking?.meet?.address,
      },
      {
        label: 'Postal Code',
        value: booking?.meet?.postalCode,
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
    resolver: yupResolver(EditBookingUserSchema),
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
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={3}>
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
        <NumberInput
          min={1}
          max={booking?.meet?.maxParticipants}
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
