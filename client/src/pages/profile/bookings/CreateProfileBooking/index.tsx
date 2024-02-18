import { FC, useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useMediaQuery,
  Button,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Step1 from "./Step1";
import CreateBookingForm from "pages/meets/Meet/CreateBooking/CreateBookingForm";
import { Meet } from "interfaces/meet";

interface CreateProfileBookingProps {
  date?: string;
}

const CreateProfileBooking: FC<CreateProfileBookingProps> = ({ date }) => {
  const toast = useToast();
  const [isLargerThan470] = useMediaQuery("(min-width: 470px)");
  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedMeet, setSelectedMeet] = useState<Meet>();

  const steps = [
    {
      title: "Meet/Participants",
      description: "Select meet and participants",
      step: () => (
        <Step1
          onParticipantSelect={handleParticipantSelect}
          onParticipantRemove={handleParticipantRemove}
          onMeetSelect={handleMeetSelect}
        />
      ),
    },
    {
      title: "Info",
      description: "Booking Info",
      step: ({ meet, participants }: any) => (
        <CreateBookingForm meet={meet} participants={participants} selectedDate={date} />
      ),
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleMeetSelect = (meet: Meet) => {
    setSelectedMeet(meet);
  };

  const handleParticipantSelect = (userId: string) => {
    setParticipants((prev) => [...prev, userId]);
  };

  const handleParticipantRemove = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p !== userId));
  };
  //&& participants.length >= 1
  async function handleNext() {
    if (selectedMeet && activeStep === 1) {
      setActiveStep(activeStep + 1);
    } else {
      toast({
        title: "Please select a meet and at least 1 participant",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <>
      <Stepper
        orientation={isLargerThan470 ? "horizontal" : "vertical"}
        flexDirection={{ base: "column", md: "row" }}
        mb={5}
        colorScheme="primary"
        index={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Stack mx={"auto"} width="100%" spacing={4}>
        {steps[activeStep - 1].step({ meet: selectedMeet as Meet, participants: participants })}

        <HStack alignItems="left">
          {activeStep > 1 && (
            <Button
              size="md"
              leftIcon={<IoIosArrowBack />}
              width={100}
              onClick={() => setActiveStep(activeStep - 1)}
              colorScheme={"primary"}
              variant={"outline"}
            >
              Back
            </Button>
          )}

          {steps.length > activeStep && (
            <Button
              rightIcon={<IoIosArrowForward />}
              size="md"
              width={100}
              onClick={handleNext}
              bg={"primary.500"}
              color={"white"}
              _hover={{
                bg: "primary.600",
              }}
            >
              Next
            </Button>
          )}
        </HStack>
      </Stack>
    </>
  );
};

export default CreateProfileBooking;
