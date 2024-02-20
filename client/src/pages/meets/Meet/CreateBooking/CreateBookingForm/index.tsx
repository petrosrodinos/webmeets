import { FC } from "react";
import TextArea from "components/ui/TextArea";
import { createBooking } from "services/booking";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BookingSchema } from "validation-schemas/booking";
import AvailabilityPeriods from "../AvailabilityPeriods";
import Input from "components/ui/Input";
import { MeetTypes } from "enums/meet";
import { authStore } from "store/authStore";
import { useToast, Stack, DrawerFooter, Button, Text } from "@chakra-ui/react";
import { Meet } from "interfaces/meet";

interface CreateBookingFormProps {
  meet: Meet;
  participants?: string[];
  selectedDate?: string;
  onClose?: () => void;
}

const CreateBookingForm: FC<CreateBookingFormProps> = ({
  meet,
  participants,
  selectedDate,
  onClose,
}) => {
  const toast = useToast();
  const { userId } = authStore((state) => state);

  const { mutate: createBookingMutation, isLoading } = useMutation(createBooking);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  const handleCreateBooking = (data: any) => {
    console.log(data);
    // return;
    if (!data.date) {
      toast({
        title: "Date is required",
        description: "Please select a date",
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }
    if (meet.type == MeetTypes.CLIENTS_LOCATION && !data.location) {
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
      meetId: meet.id,
      profileId: meet?.profile?.id as string,
      location: data.location,
      date: data.date,
      notes: participants ? data.notes : undefined,
      participants: participants
        ? participants.map((p) => ({
            userId: p,
            notes: "",
          }))
        : [
            {
              userId,
              notes: data.notes,
            },
          ],
    };
    createBookingMutation(payload, {
      onSuccess: () => {
        toast({
          title: "Booking created",
          description: "Your booking was created successfully",
          position: "top",
          isClosable: true,
          status: "success",
        });
        // const paymentUrl = data.payment.url;
        // window.open(paymentUrl, '_blank');
      },
      onError: (error: any) => {
        toast({
          title: "Could not create booking",
          description: error.message,
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    });
  };

  const handlePeriodSelected = (date: string) => {
    setValue("date", date);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateBooking)}>
        <Stack spacing="20px">
          <Text>Select a date to find you a booking</Text>

          <AvailabilityPeriods
            selectedDate={selectedDate}
            onPeriodSelected={handlePeriodSelected}
            meetId={meet?.id as string}
          />

          {meet.type == "clients-location" && (
            <Input
              label="Location"
              placeholder="Enter Location"
              error={errors.location?.message}
              register={register("location")}
            />
          )}

          <TextArea
            label="Notes (Optional)"
            placeholder="Add some notes for the host"
            register={register("notes")}
          />

          <DrawerFooter borderTopWidth="1px">
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              _hover={{
                bg: "primary.600",
              }}
              mr={3}
              textColor="white"
              type="submit"
              bg="primary.500"
            >
              Create
            </Button>
            {!participants?.length && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </DrawerFooter>
        </Stack>
      </form>
    </div>
  );
};

export default CreateBookingForm;
