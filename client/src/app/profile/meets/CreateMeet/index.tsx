'use client';

import { Flex, Stack, Button, useToast, VStack, Text, Box, RadioGroup, Radio, Center, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useState } from 'react';
import TextArea from '@/components/ui/TextArea';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Modal from '@/components/ui/Modal';
import { createMeet, editMeet } from '@/services/meets';
import { MeetSchema } from '@/validation-schemas/meet';
import { Meet, MeetType } from '@/interfaces/meet';
import ImagePicker from '@/components/ui/ImagePicker';
import { ImagePickerItemData } from '@/interfaces/components';
import NumberInput from '@/components/ui/NumberInput';
import { SERVICE_CATEGORIES } from '@/constants/optionsData';
import Select from '@/components/ui/Select';

interface CreateMeetProps {
  meet?: Meet;
}

const CreateMeet: FC<CreateMeetProps> = ({ meet }) => {
  const toast = useToast();
  const [createdMeetId, setCreatedMeetId] = useState<string | null>(null);
  const router = useRouter();
  const [type, setType] = useState<MeetType>('remote');

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MeetSchema),
  });

  const { mutate: createMeetMutation, isLoading } = useMutation((data: any) => {
    return createMeet(data);
  });

  const { mutate: editMeetMutation } = useMutation((data: any) => {
    return editMeet(meet?.id as string, data);
  });

  function onSubmit(values: any) {
    console.log(values);

    // return;

    const payload = {
      ...values,
      type,
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
      type,
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

  const handleImageChange = (data: ImagePickerItemData) => {
    setValue(data.name as 'images', data.files);
  };

  const handleActionClick = () => {
    setCreatedMeetId(null);
    router.push(`/profile/meets/${createdMeetId}`);
  };

  const handleChange = (value: any) => {
    setType(value);
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
      <Flex>
        <Stack mx={'auto'} width="100%" spacing={4}>
          <Box>
            <form onSubmit={handleSubmit(meet ? onSave : onSubmit)}>
              <Stack>
                <Input placeholder="Enter meet name" label="Name" error={errors.name?.message} register={register('name')} />

                <TextArea
                  error={errors.description?.message}
                  label="Description"
                  register={register('description')}
                  placeholder="Add your meet description here"
                />
                <Select
                  error={errors.category?.message}
                  placeholder="Category"
                  options={SERVICE_CATEGORIES}
                  label="Category"
                  register={register('category')}
                />
                <NumberInput
                  min={1}
                  defaultValue={60}
                  label="Duration (minutes)"
                  error={errors.duration?.message}
                  register={register('duration')}
                />
                <NumberInput
                  min={1}
                  defaultValue={1}
                  label="Max Participants"
                  error={errors.maxParticipants?.message}
                  register={register('maxParticipants')}
                />
                <NumberInput min={0} defaultValue={5} label="Price" error={errors.price?.message} register={register('price')} />

                <ImagePicker name="images" label="Select images" onChange={handleImageChange} />

                <FormLabel>Location</FormLabel>
                <Center>
                  <RadioGroup onChange={handleChange} value={type}>
                    <Stack direction="row">
                      <Radio size="lg" value="remote">
                        Remote
                      </Radio>
                      <Radio size="lg" value="in-person">
                        In Person
                      </Radio>
                      <Radio size="lg" value="clients-location">
                        Client's Location
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Center>

                {type == 'remote' && (
                  <VStack>
                    <Input label="Url" error={errors.phone?.message} register={register('phone')} />
                  </VStack>
                )}

                {type == 'in-person' && (
                  <VStack>
                    <Input
                      label="Phone Number"
                      placeholder="Enter Phone"
                      error={errors.phone?.message}
                      register={register('phone')}
                    />
                    <Input label="City" placeholder="Enter City" error={errors.city?.message} register={register('city')} />
                    <Input label="Area" placeholder="Enter Area" error={errors.area?.message} register={register('area')} />

                    <Input
                      label="Address"
                      placeholder="Enter Address"
                      error={errors.address?.message}
                      register={register('address')}
                    />

                    <Input
                      label="Postal Code"
                      placeholder="Enter Postal Code"
                      error={errors.postalCode?.message}
                      register={register('postalCode')}
                    />
                  </VStack>
                )}

                {type == 'client-location' && (
                  <VStack>
                    <Input label="Max visited area" error={errors.phone?.message} register={register('phone')} />
                  </VStack>
                )}

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
      </Flex>
    </>
  );
};

export default CreateMeet;
