import { Booking, BookingInfoItem } from "interfaces/booking";
import { cancelBooking, editBooking } from "services/booking";
import { EditBookingProfileSchema } from "validation-schemas/booking";
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
  VStack,
} from "@chakra-ui/react";
import Input from "components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { MeetTypes } from "enums/meet";
import { Roles } from "enums/roles";
import Modal from "components/ui/Modal";
import TextArea from "components/ui/TextArea";
import { formatDate, formatDateFromUTC } from "lib/date";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AvailabilityPeriods from "pages/meets/Meet/CreateBooking/AvailabilityPeriods";
import { useBooking } from "hooks/booking";

interface BookingInfoProps {
  booking: Booking;
  onDateChange?: (bookingId: string, date: string) => void;
  onCancel?: (bookingId: string) => void;
}

const BookingInfo: FC<BookingInfoProps> = ({ booking, onDateChange, onCancel }) => {
  const toast = useToast();
  const { isEditable } = useBooking(booking);
  const [bookingInfo, setBookingInfo] = useState<BookingInfoItem[]>();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEditDateModalOpen, setIsEditDateModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const { mutate: editBookingMutation, isLoading } = useMutation(editBooking);
  const { mutate: cancelBookingMutation, isLoading: isCanceling } = useMutation(cancelBooking);

  useEffect(() => {
    console.log(booking);
    reset({
      date: formatDateFromUTC(booking.date),
    });
  }, [booking]);

  useEffect(() => {
    setBookingInfo([
      {
        label: "Meet",
        value: booking.meet.name,
      },
      {
        label: "Duration",
        value: String(booking?.meet?.duration) || "NOT-SET",
      },
      {
        label: "Meet URL",
        value: "http:someurl",
        type: MeetTypes.REMOTE,
      },
      {
        label: "Location",
        value: booking?.location || "",
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
    resolver: yupResolver(EditBookingProfileSchema),
  });

  const handleEditBooking = (data: any) => {
    const payload = {
      bookingId: booking.id,
      ...data,
    };
    editBookingMutation(payload, {
      onSuccess: () => {
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
    });
  };

  const handleCancelBooking = () => {
    const payload = {
      bookingId: booking.id,
      reason,
      role: Roles.ADMIN,
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
          <Text fontWeight="bold">Participants:</Text>
          <Box
            display="flex"
            flexDirection="column"
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={3}
          >
            {booking.participants?.map((participant, index) => {
              return (
                <HStack key={index}>
                  <Avatar size="sm" src={participant.user.avatar} />
                  <VStack>
                    <Text>{`${participant.user.firstname} ${participant.user.lastname}`}</Text>
                    <Text>Notes:{participant.notes}</Text>
                  </VStack>
                </HStack>
              );
            })}
            <HStack mt={10}>
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
            </HStack>
            {isEditable && (
              <Button
                mt={10}
                isLoading={isLoading}
                colorScheme="green"
                variant="solid"
                type="submit"
                maxWidth="100px"
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
                {booking?.activity?.map((activity, index) => (
                  <HStack key={index}>
                    <Text>
                      Booking cancelled by {activity.role == Roles.ADMIN ? "Creator " : "User "}
                      because {activity.description} at {formatDate(activity.createdAt)}
                    </Text>
                  </HStack>
                ))}
              </Box>
            </>
          )}

          {isEditable && (
            <Box
              display="flex"
              flexDirection="column"
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={3}
            >
              <Button
                mb={5}
                onClick={handleJoinBooking}
                isLoading={isLoading}
                colorScheme="green"
                variant="outline"
                mt={5}
              >
                Join
              </Button>
              <Button colorScheme="red" variant="outline" onClick={toggleCancelModal}>
                Cancel
              </Button>
            </Box>
          )}
        </Stack>
      </form>
    </>
  );
};

export default BookingInfo;
