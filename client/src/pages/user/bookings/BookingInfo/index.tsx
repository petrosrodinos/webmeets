import { Booking, BookingInfoItem, BookingParticipant } from "interfaces/booking";
import { cancelBooking, editBooking } from "services/booking";
import { EditBookingUserSchema } from "validation-schemas/booking";
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
  // IconButton,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Input from "components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import TextArea from "components/ui/TextArea";
import { formatDate, formatDateFromUTC } from "lib/date";
import { MeetTypes } from "enums/meet";
import { FaCheck } from "react-icons/fa6";
import Modal from "components/ui/Modal";
import { Roles } from "enums/roles";
// import { MdEdit } from "react-icons/md";
import { authStore } from "store/authStore";
import { editParticipant } from "services/booking";
import { useNavigate } from "react-router-dom";
import AvailabilityPeriods from "pages/meets/Meet/CreateBooking/AvailabilityPeriods";
import { useBooking } from "hooks/booking";

interface BookingInfoProps {
  booking: Booking;
  onDateChange?: (bookingId: string, date: string) => void;
  onCancel?: (bookingId: string) => void;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking, onDateChange, onCancel }) => {
  const navigate = useNavigate();
  const { userId } = authStore((state) => state);
  const toast = useToast();
  const { isEditable, canJoin } = useBooking(booking);
  const [bookingInfo, setBookingInfo] = useState<BookingInfoItem[]>();
  const [participant, setParticipant] = useState<BookingParticipant>();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEditDateModalOpen, setIsEditDateModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const { mutate: editBookingMutation, isLoading } = useMutation(editBooking);
  const { mutate: cancelBookingMutation, isLoading: isCanceling } = useMutation(cancelBooking);
  const { mutate: editParticipantMutation } = useMutation(editParticipant);

  useEffect(() => {
    if (!booking) return;
    const participant = booking.participants.find((participant) => participant.user.id == userId);
    reset({
      date: new Date(booking.date).toISOString().slice(0, 16),
      location: booking.location,
      notes: participant?.notes || "",
    });
    setParticipant(participant);
  }, [booking]);

  useEffect(() => {
    if (!booking) return;
    setBookingInfo([
      {
        label: "Meet",
        value: booking?.meet?.name || "-",
      },
      {
        label: "Date",
        value: formatDate(booking?.date, true) || "-",
      },

      {
        label: "Duration",
        value: booking?.meet?.duration.toString() || "-",
      },
      {
        label: "Price",
        value: `${booking?.meet?.price}€`,
      },
      {
        label: "Participants",
        value: `${booking?.participants.length}`,
      },
      {
        label: "Created at",
        value: formatDate(booking.createdAt, true),
      },
      {
        label: "Notes",
        value: booking.participants[0].notes || "-",
      },
      {
        label: "Profile Notes",
        value: `${booking?.notes || "-"}`,
      },
      {
        label: "Phone Number",
        value: booking?.meet?.phone || "-",
        type: MeetTypes.IN_PERSON,
      },
      {
        label: "Address",
        value: `${booking?.meet?.city} ${booking?.meet?.address}, ${booking?.meet?.postalCode}`,
        type: MeetTypes.IN_PERSON,
      },
      {
        label: "Location",
        value: booking?.location || "-",
        type: MeetTypes.CLIENTS_LOCATION,
      },
    ]);
  }, [booking]);

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
    if (data.notes != participant?.notes) {
      editBookingParticipant(data);
    }
    if (data.location != booking.location) {
      if (booking.meet.type == MeetTypes.CLIENTS_LOCATION && !data.location) {
        toast({
          title: "Location is required",
          description: "Please enter a location",
          position: "top",
          isClosable: true,
          status: "error",
        });
        return;
      }

      const payload = {
        bookingId: booking.id,
        location: data.location,
      };
      editBookingMutation(payload, bookingMutationResult(data));
    }
  };

  const editBookingParticipant = (data: any) => {
    const payload = {
      bookingId: booking.id,
      participantId: participant?.id as string,
      notes: data.notes,
    };

    editParticipantMutation(payload, bookingMutationResult(data));
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
          title: "Booking cancelled successfully",
          description: "We've cancelled your booking for you.",
          position: "top",
          isClosable: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Could not cancel booking",
          description: error.message,
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    });
  };

  const bookingMutationResult = (data: any) => {
    return {
      onSuccess: () => {
        const updatedBookingInfo = bookingInfo?.map((info) => {
          if (info.label == "Date") {
            return {
              ...info,
              value: formatDate(data.date, true),
            };
          }
          if (info.label == "Location") {
            return {
              ...info,
              value: data.location,
            };
          }
          if (info.label == "Notes") {
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
          title: "Booking edited successfully",
          position: "top",
          isClosable: true,
          status: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Could not edit booking",
          description: error.message,
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    };
  };

  const handleJoinBooking = () => {
    navigate(`/meet/${booking.id}`);
  };

  const handlePeriodSelected = (date: string) => {
    setValue("date", formatDateFromUTC(date));
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
        <AvailabilityPeriods
          onPeriodSelected={handlePeriodSelected}
          meetId={booking?.meet?.id as string}
        />
      </Modal>
      <form onSubmit={handleSubmit(handleEditBooking)}>
        <Stack spacing="20px">
          <Box
            display="flex"
            flexDirection="column"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
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

          <Box
            display="flex"
            flexDirection="column"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={3}
          >
            {/* <HStack>
              <Input
                disabled={true}
                label="Date"
                error={errors.date?.message}
                type="datetime-local"
                register={register("date")}
                onClick={toggleEditDateModal}
              />
              <IconButton
                mt={8}
                colorScheme="green"
                aria-label="Find availability for this date"
                icon={<MdEdit />}
                onClick={toggleEditDateModal}
                isDisabled={!isEditable}
              />
            </HStack> */}

            {booking.meet.type == MeetTypes.CLIENTS_LOCATION && (
              <Input
                label="Location"
                placeholder="Enter location"
                error={errors.location?.message}
                register={register("location")}
                disabled={!isEditable}
              />
            )}

            <TextArea
              disabled={!isEditable}
              label="Notes"
              placeholder="Add some notes"
              register={register("notes")}
            />

            {isEditable && (
              <Button
                rightIcon={<FaCheck />}
                isLoading={isLoading}
                colorScheme="green"
                variant="solid"
                type="submit"
                maxWidth="100px"
                mt={5}
              >
                Save
              </Button>
            )}
          </Box>

          {booking.activity.length > 0 && (
            <>
              <Text fontWeight="bold">Activity</Text>
              <Box
                display="flex"
                flexDirection="column"
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={3}
              >
                <VStack alignItems={"flex-start"} spacing={3}>
                  {booking?.activity?.map((activity, index) => (
                    <Text key={index}>{activity.description}</Text>
                  ))}
                </VStack>
              </Box>
            </>
          )}

          <Box
            display="flex"
            flexDirection="column"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={3}
          >
            {booking.meet.type == MeetTypes.REMOTE && (
              <Tooltip
                hasArrow
                label={
                  !canJoin && isEditable
                    ? "This button will be enabled when booking time arrives"
                    : ""
                }
                bg="primary.500"
                color="white"
              >
                <Button
                  onClick={handleJoinBooking}
                  colorScheme="green"
                  variant="outline"
                  isDisabled={!canJoin}
                  mt={5}
                  mb={3}
                >
                  Join
                </Button>
              </Tooltip>
            )}
            <Button
              isDisabled={!isEditable}
              colorScheme="red"
              variant="outline"
              onClick={toggleCancelModal}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default BookingInfo;
