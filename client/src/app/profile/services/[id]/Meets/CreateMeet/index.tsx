'use client';

import { Flex, Stack, Button, useToast, VStack, Text, Box, RadioGroup, Radio, Center } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/components/ui/FilePicker';
import { useState } from 'react';
import TextArea from '@/components/ui/TextArea';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Modal from '@/components/ui/Modal';
import { createMeet } from '@/services/meets';
import { MeetSchema } from '@/validation-schemas/meet';
import { useParams } from 'next/navigation';

interface CreateMeetProps {
  serviceId: string;
}

type Place = 'remote' | 'client-location' | 'in-person';

const CreateMeet: FC<CreateMeetProps> = () => {
  const params = useParams();
  const { id } = params;
  const toast = useToast();
  const [createdMeetId, setCreatedMeetId] = useState<string | null>(null);
  const router = useRouter();
  const [type, setType] = useState<Place>('remote');

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MeetSchema),
  });

  const { mutate: createMeetMutation, isLoading } = useMutation((user: any) => {
    return createMeet(user);
  });

  function onSubmit(values: any) {
    console.log(values);

    // return;

    const payload = {
      ...values,
      type,
      serviceId: id,
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

  const handleBannerChange = ({ file, name }: { file: File; name: any }) => {
    setValue(name, file);
  };

  const handleActionClick = () => {
    setCreatedMeetId(null);
    router.push(`/services/${createdMeetId}`);
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
        actionTitle="GO"
        onAction={handleActionClick}
      >
        <Text>Now you can visit your meet.</Text>
      </Modal>
      <Flex>
        <Stack mx={'auto'} width={'xl'} spacing={4}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Input placeholder="Enter meet name" label="Name" error={errors.name?.message} register={register('name')} />

                <TextArea
                  error={errors.description?.message}
                  label="Description"
                  register={register('description')}
                  placeholder="Add your meet description here"
                />
                <Input
                  placeholder="Enter meet duration"
                  label="Duration"
                  error={errors.duration?.message}
                  register={register('duration')}
                />
                <Input
                  placeholder="Enter max participants"
                  label="Max Participants"
                  error={errors.maxParticipants?.message}
                  register={register('maxParticipants')}
                />
                <Input placeholder="Enter Price" label="Price" error={errors.price?.message} register={register('price')} />

                <FileUpload
                  placeholder="Add photos"
                  previewType="banner"
                  onChange={handleBannerChange}
                  label="Meet Photos"
                  name="images"
                  accept="image/*"
                />

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
                    <Input label="Phone Number" error={errors.phone?.message} register={register('phone')} />
                    <Input label="City" error={errors.city?.message} register={register('city')} />
                    <Input label="Area" error={errors.area?.message} register={register('area')} />

                    <Input label="Address" error={errors.address?.message} register={register('address')} />

                    <Input label="Postal Code" error={errors.postalCode?.message} register={register('postalCode')} />
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
                  loadingText="Creating..."
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Create
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
