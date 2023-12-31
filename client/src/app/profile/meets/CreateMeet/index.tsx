'use client';

import { Stack, Button, useToast, Text, Box, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { createMeet, editMeet } from '@/services/meets';
import { MeetSchema } from '@/validation-schemas/meet';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Meet } from '@/interfaces/meet';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
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
} from '@chakra-ui/react';
interface CreateMeetProps {
  meet?: Meet;
}

const CreateMeet: FC<CreateMeetProps> = ({ meet }) => {
  const toast = useToast();
  const [createdMeetId, setCreatedMeetId] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: meet?.name || '',
      description: meet?.description || '',
      category: meet?.category || '',
      images: meet?.images || [],
      type: meet?.type || 'remote',
      duration: meet?.duration || 60,
      maxParticipants: meet?.maxParticipants || 5,
      price: meet?.price || 0,
    },
    resolver: yupResolver(MeetSchema),
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: 3,
  });

  const steps = [
    {
      title: 'Step 1',
      description: 'Information',
      step: <Step1 register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: 'Step 2',
      description: 'Participants/Price/Duration',
      step: <Step2 register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: 'Step 3',
      description: 'Opening Hours',
      step: <Step3 register={register} setValue={setValue} errors={errors} />,
    },
  ];

  const { mutate: createMeetMutation, isLoading } = useMutation((data: any) => {
    return createMeet(data);
  });

  const { mutate: editMeetMutation } = useMutation((data: any) => {
    return editMeet(meet?.id as string, data);
  });

  async function handleNext() {
    let fildsToValidate: any[] = [];
    if (activeStep === steps.length) {
      onSubmit(getValues());
      return;
    }
    if (activeStep === 1) {
      fildsToValidate = ['name', 'description', 'category'];
      await trigger(fildsToValidate);
    } else if (activeStep === 2) {
      fildsToValidate = ['duration', 'maxParticipants'];
      await trigger(fildsToValidate);
    }
    const isValid = fildsToValidate.every((field: any) => getValues(field));
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  }

  function onSubmit(values: any) {
    console.log('final', values);

    // return;

    const payload = {
      ...values,
    };

    createMeetMutation(payload, {
      onSuccess: (data) => {
        setCreatedMeetId(data._id);
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  }

  function onSave(values: any) {
    console.log(values);

    // return;

    const payload = {
      ...values,
    };

    editMeetMutation(payload, {
      onSuccess: (data: any) => {
        toast({
          title: 'Meet updated successfully',
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Something went wrong',
          description: error.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      },
    });
  }

  const handleActionClick = () => {
    setCreatedMeetId(null);
    router.push(`/profile/meets/${createdMeetId}`);
  };

  return (
    <>
      <Modal
        title="Your meet is created"
        isOpen={!!createdMeetId}
        onClose={() => setCreatedMeetId(null)}
        actionTitle="VISIT"
        onAction={handleActionClick}
      >
        <Text>Now you can manage your meet.</Text>
      </Modal>
      <Stepper mb={5} colorScheme="primary" index={activeStep - 1}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Stack mx={'auto'} width="100%" spacing={4}>
        {steps[2].step}

        <HStack alignItems="left">
          {activeStep > 1 && (
            <Button
              size="md"
              leftIcon={<IoIosArrowBack />}
              width={100}
              onClick={() => setActiveStep(activeStep - 1)}
              bg={'secondary.900'}
              color={'white'}
              _hover={{
                bg: 'primary.600',
              }}
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
            bg={'primary.500'}
            color={'white'}
            _hover={{
              bg: 'primary.600',
            }}
          >
            {activeStep === steps.length ? 'Create' : 'Next'}
          </Button>
        </HStack>
      </Stack>
    </>
  );
};

export default CreateMeet;
