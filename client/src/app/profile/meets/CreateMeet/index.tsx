'use client';

import { Flex, Stack, Button, useToast, Text, Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { createMeet, editMeet } from '@/services/meets';
import { MeetSchema } from '@/validation-schemas/meet';
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
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
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
      step: <Step1 onNext={handleNext} register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: 'Step 2',
      description: 'Participants/Price/Duration',
      step: <Step2 onNext={handleNext} register={register} setValue={setValue} errors={errors} />,
    },
    {
      title: 'Step 3',
      description: 'Opening Hours',
      step: <Step3 onNext={handleNext} register={register} setValue={setValue} errors={errors} />,
    },
  ];

  const { mutate: createMeetMutation, isLoading } = useMutation((data: any) => {
    return createMeet(data);
  });

  const { mutate: editMeetMutation } = useMutation((data: any) => {
    return editMeet(meet?.id as string, data);
  });

  function handleNext() {
    setActiveStep(activeStep + 1);
  }

  function onSubmit(values: any) {
    console.log(values);

    // return;

    const payload = {
      ...values,
      // type,
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
      // type,
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
      <Stepper mb={5} colorScheme="primary" index={activeStep}>
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
      {steps[activeStep - 1].step}
      {/* <Flex>
        <Stack mx={'auto'} width="100%" spacing={4}>
          <Box>
            <form onSubmit={handleSubmit(meet ? onSave : onSubmit)}>
              <Stack>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  loadingText={meet ? 'Updating' : 'Creating'}
                  size="lg"
                  bg={'primary.500'}
                  color={'white'}
                  _hover={{
                    bg: 'primary.600',
                  }}
                >
                  {meet ? 'Update' : 'Create'}
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex> */}
    </>
  );
};

export default CreateMeet;
