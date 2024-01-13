import { Booking, BookingInfoItem } from '@/interfaces/booking';
import { editBooking } from '@/services/booking';
import { EditBookingUserSchema } from '@/validation-schemas/booking';
import { useToast, Stack, Text, Button, List, ListItem, Box, useColorModeValue, HStack, Avatar } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// import NumberInput from '@/components/ui/NumberInput';
import TextArea from '@/components/ui/TextArea';
import { formatDate } from '@/lib/date';

interface BookingInfoProps {
  booking: Booking;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking }) => {
  const toast = useToast();
  const [bookingInfo, setBookingInfo] = useState<BookingInfoItem[]>();
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
        label: 'Meet',
        value: booking?.meet?.name || 'NOT-SET',
      },
      {
        label: 'Notes',
        value: booking?.notes || '',
      },
      {
        label: 'Duration',
        value: booking?.meet?.duration.toString() || 'NOT-SET',
      },
      {
        label: 'Created at',
        value: formatDate(booking.createdAt, true),
      },
      {
        label: 'Price',
        value: `${booking?.meet?.price}€`,
      },
      {
        label: 'Phone Number',
        value: booking?.meet?.phone || 'NOT-SET',
        type: 'in-person',
      },
      {
        label: 'City',
        value: booking?.meet?.city || 'NOT-SET',
        type: 'in-person',
      },
      {
        label: 'Address',
        value: booking?.meet?.address || 'NOT-SET',
        type: 'in-person',
      },
      {
        label: 'Postal Code',
        value: booking?.meet?.postalCode || 'NOT-SET',
        type: 'in-person',
      },
      {
        label: 'Meet URL',
        value: 'http:someurl',
        type: 'remote',
      },
      {
        label: 'Location',
        value: booking?.meet?.location || 'my place',
        type: 'clients-location',
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
    editBookingMutation(data, {
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
    });
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
          <Avatar alignSelf="center" size="xl" src={booking?.profile?.avatar} mb={4} />
          <List spacing={2}>
            {bookingInfo?.map((info, index) => {
              return (
                <>
                  {!info?.type || info.type == booking?.meet?.type ? (
                    <ListItem key={index}>
                      <HStack>
                        <Text fontWeight="bold">{info.label}:</Text>
                        <Text>{info.value}</Text>
                      </HStack>
                    </ListItem>
                  ) : null}
                </>
              );
            })}
          </List>
        </Box>
        {/* <NumberInput
          min={1}
          max={booking?.meet?.maxParticipants}
          error={errors.participants?.message}
          label="Participants"
          register={register('participants')}
        /> */}

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
