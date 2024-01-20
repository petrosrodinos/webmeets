import { Booking, BookingInfoItem } from '@/interfaces/booking';
import { cancelBooking, editBooking } from '@/services/booking';
import { EditBookingUserSchema } from '@/validation-schemas/booking';
import {
  useToast,
  Stack,
  Text,
  Button,
  List,
  ListItem,
  Box,
  useColorModeValue,
  HStack,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import TextArea from '@/components/ui/TextArea';
import { formatDate, formatDateFromUTC } from '@/lib/date';
import { MeetTypes } from 'enums/meet';
import { FaCheck } from 'react-icons/fa6';
import Modal from '@/components/ui/Modal';
import { Roles } from 'enums/roles';
import { BookingStatuses } from 'enums/booking';
import AvailabilityPeriods from 'app/meets/[id]/CreateBooking/AvailabilityPeriods';
import { MdEdit } from 'react-icons/md';
import { authStore } from '@/store/authStore';

interface BookingInfoProps {
  booking: Booking;
  onDateChange?: (bookingId: string, date: string) => void;
  onCancel?: (bookingId: string) => void;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking, onDateChange, onCancel }) => {
  const { userId } = authStore((state) => state);
  const toast = useToast();
  const [bookingInfo, setBookingInfo] = useState<BookingInfoItem[]>();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEditDateModalOpen, setIsEditDateModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { mutate: editBookingMutation, isLoading } = useMutation(editBooking);
  const { mutate: cancelBookingMutation, isLoading: isCanceling } = useMutation(cancelBooking);

  useEffect(() => {
    const usersNotes = booking.participants.find((participant) => participant.user.id == userId)?.notes;
    reset({
      date: new Date(booking.date).toISOString().slice(0, 16),
      location: booking.location,
      notes: usersNotes,
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
        value: booking.participants[0].notes || '',
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
    setValue,
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
      bookingId: booking.id,
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
        if (data.date != booking.date) {
          onDateChange?.(booking.id, data.date);
        }
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
    const payload = {
      bookingId: booking.id,
      reason,
      role: Roles.USER,
    };
    cancelBookingMutation(payload, {
      onSuccess: () => {
        onCancel?.(booking.id);
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
    });
  };

  const handlePeriodSelected = (date: string) => {
    setValue('date', formatDateFromUTC(date));
  };

  const toggleCancelModal = () => {
    setIsCancelModalOpen(!isCancelModalOpen);
  };

  const toggleEditDateModal = () => {
    setIsEditDateModalOpen(!isEditDateModalOpen);
  };

  return (
    <>
      <Modal
        isOpen={isCancelModalOpen}
        onClose={toggleCancelModal}
        title="Are you sure you want to cancel this booking?"
        actionTitle="Cancel"
        onAction={handleCancelBooking}
        closeTitle="Close"
        actionTitleLoading={isCanceling}
      >
        <TextArea
          onChange={(e: any) => setReason(e.target.value)}
          label="Reason (optional)"
          placeholder="Why are you canceling this booking?"
        />
      </Modal>
      <Modal
        isOpen={isEditDateModalOpen}
        onClose={toggleEditDateModal}
        title="Find availability for this booking"
        actionTitle="Save"
        onAction={toggleEditDateModal}
      >
        <AvailabilityPeriods onPeriodSelected={handlePeriodSelected} meetId={booking?.meet?.id as string} />
      </Modal>
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

          <HStack>
            <Input
              disabled={true}
              label="Date"
              error={errors.date?.message}
              type="datetime-local"
              register={register('date')}
              onClick={toggleEditDateModal}
            />
            <IconButton
              mt={8}
              colorScheme="green"
              aria-label="Find availability for this date"
              icon={<MdEdit />}
              onClick={toggleEditDateModal}
            />
          </HStack>

          {booking.meet.type == MeetTypes.CLIENTS_LOCATION && (
            <Input
              label="Location"
              placeholder="Enter location"
              error={errors.location?.message}
              register={register('location')}
              disabled={booking.status == BookingStatuses.CANCELLED}
            />
          )}

          <TextArea
            disabled={booking.status == BookingStatuses.CANCELLED}
            label="Notes"
            placeholder="Add some notes"
            register={register('notes')}
          />
          {booking.status != BookingStatuses.CANCELLED && (
            <>
              <Button
                rightIcon={<FaCheck />}
                isLoading={isLoading}
                colorScheme="green"
                variant="solid"
                type="submit"
                maxWidth="100px"
              >
                Save
              </Button>
              <Button colorScheme="red" variant="outline" onClick={toggleCancelModal}>
                Cancel Booking
              </Button>
            </>
          )}
        </Stack>
      </form>
    </>
  );
};

export default BookingInfo;
