import { Booking, BookingInfoItem } from '@/interfaces/booking';
import { editBooking } from '@/services/booking';
import { EditBookingUserSchema } from '@/validation-schemas/booking';
import { useToast, Stack, Text, Button, List, ListItem, Box, useColorModeValue, HStack, Avatar } from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import TextArea from '@/components/ui/TextArea';
import { formatDate } from '@/lib/date';
import { MeetTypes } from 'enums/meet';
import { FaCheck } from 'react-icons/fa6';
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
      location: booking.location,
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
        type: MeetTypes.IN_PERSON,
      },
      {
        label: 'City',
        value: booking?.meet?.city || 'NOT-SET',
        type: MeetTypes.IN_PERSON,
      },
      {
        label: 'Address',
        value: booking?.meet?.address || 'NOT-SET',
        type: MeetTypes.IN_PERSON,
      },
      {
        label: 'Postal Code',
        value: booking?.meet?.postalCode || 'NOT-SET',
        type: MeetTypes.IN_PERSON,
      },
      {
        label: 'Meet URL',
        value: 'http:someurl',
        type: MeetTypes.REMOTE,
      },
      {
        label: 'Location',
        value: booking?.location || 'NOT-SET',
        type: MeetTypes.CLIENTS_LOCATION,
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
    if (booking.meet.type == MeetTypes.CLIENTS_LOCATION && !data.location) {
      toast({
        title: 'Location is required',
        description: 'Please enter a location',
        position: 'top',
        isClosable: true,
        status: 'error',
      });
      return;
    }
    const payload = {
      meetId: booking.id,
      ...data,
    };
    editBookingMutation(payload, {
      onSuccess: () => {
        const updatedBookingInfo = bookingInfo?.map((info) => {
          if (info.label == 'Date') {
            return {
              ...info,
              value: formatDate(data.date, true),
            };
          }
          if (info.label == 'Location') {
            return {
              ...info,
              value: data.location,
            };
          }
          if (info.label == 'Notes') {
            return {
              ...info,
              value: data.notes,
            };
          }

          return info;
        });
        setBookingInfo(updatedBookingInfo);
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
    // editBookingMutation(
    //   {
    //     ...booking,
    //   },
    //   {
    //     onSuccess: () => {
    //       toast({
    //         title: 'Booking cancelled successfully',
    //         description: "We've cancelled your booking for you.",
    //         position: 'top',
    //         isClosable: true,
    //         status: 'success',
    //       });
    //     },
    //     onError: (error: any) => {
    //       toast({
    //         title: 'Could not cancel booking',
    //         description: error.message,
    //         position: 'top',
    //         isClosable: true,
    //         status: 'error',
    //       });
    //     },
    //   },
    // );
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
                <div key={index}>
                  {!info?.type || info.type == booking?.meet?.type ? (
                    <ListItem key={index}>
                      <HStack>
                        <Text fontWeight="bold">{info.label}:</Text>
                        <Text>{info.value}</Text>
                      </HStack>
                    </ListItem>
                  ) : null}
                </div>
              );
            })}
          </List>
        </Box>

        <Input
          label="Date"
          placeholder="Enter Date"
          error={errors.date?.message}
          type="datetime-local"
          register={register('date')}
        />

        {booking.meet.type == MeetTypes.CLIENTS_LOCATION && (
          <Input label="Location" placeholder="Enter location" error={errors.location?.message} register={register('location')} />
        )}

        <TextArea label="Notes" placeholder="Add some notes" register={register('notes')} />
        <Button rightIcon={<FaCheck />} isLoading={isLoading} colorScheme="green" variant="solid" type="submit" maxWidth="100px">
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
