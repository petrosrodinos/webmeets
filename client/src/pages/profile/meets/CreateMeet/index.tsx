import { Stack, Button, useToast, Text, Box, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { FC, useState } from "react";
import Modal from "components/ui/Modal";
import { createMeet } from "services/meets";
import { MeetSchema } from "validation-schemas/meet";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Meet } from "interfaces/meet";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNavigate } from "react-router-dom";
import {
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
} from "@chakra-ui/react";
interface CreateMeetProps {
  meet?: Meet;
}

const CreateMeet: FC<CreateMeetProps> = () => {
  const navigate = useNavigate();
  const [isLargerThan470] = useMediaQuery("(min-width: 470px)");
  const toast = useToast();
  const [createdMeetId, setCreatedMeetId] = useState<string | null>(null);

  const { mutate: createMeetMutation, isLoading } = useMutation((data: any) => {
    return createMeet(data);
  });

  const {
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      images: [],
      type: "remote",
      duration: 60,
      maxParticipants: 5,
      price: 0,
      hours: [],
    },
    resolver: yupResolver(MeetSchema),
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: 3,
  });

  const steps = [
    {
      title: "Step 1",
      description: "Information",
      step: <Step1 register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: "Step 2",
      description: "Pricing",
      step: <Step2 register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: "Step 3",
      description: "Opening Hours",
      step: <Step3 setValue={setValue} />,
    },
  ];

  async function handleNext() {
    let fildsToValidate: any[] = [];
    if (activeStep === steps.length) {
      onSubmit(getValues());
      return;
    }
    if (activeStep === 1) {
      fildsToValidate = ["name", "description", "category"];
      await trigger(fildsToValidate);
    } else if (activeStep === 2) {
      fildsToValidate = ["duration", "maxParticipants"];
      await trigger(fildsToValidate);
    }
    const isValid = fildsToValidate.every((field: any) => getValues(field));
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  }

  function onSubmit(values: any) {
    console.log("values", values);
    const meetValues = {
      ...values,
      hours: values.hours.map((hour: any) => {
        delete hour.id;
        const periods = hour.periods.map((period: any) => {
          delete period.id;
          return period;
        });
        return {
          ...hour,
          periods,
        };
      }),
    };

    createMeetMutation(meetValues, {
      onSuccess: (data) => {
        setCreatedMeetId(data._id);
      },
      onError: (error: any) => {
        toast({
          title: "Something went wrong",
          description: error.message,
          position: "top",
          isClosable: true,
          status: "error",
        });
      },
    });
  }

  const handleActionClick = () => {
    setCreatedMeetId(null);
    navigate(`/profile/meets/${createdMeetId}`);
  };

  return (
    <>
      <Modal
        title="Your meet is created"
        isOpen={!!createdMeetId}
        onClose={() => setCreatedMeetId(null)}
        actionTitle="Visit"
        onAction={handleActionClick}
      >
        <Text>Now you can manage your meet.</Text>
      </Modal>
      <Stepper
        orientation={isLargerThan470 ? "horizontal" : "vertical"}
        flexDirection={{ base: "column", md: "row" }}
        mb={5}
        colorScheme="primary"
        index={activeStep - 1}
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
        {steps[activeStep - 1].step}

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

          <Button
            isLoading={isLoading}
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
            {activeStep === steps.length ? "Create" : "Next"}
          </Button>
        </HStack>
      </Stack>
    </>
  );
};

export default CreateMeet;
