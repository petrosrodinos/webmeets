'use client';

import { Flex, Stack, Button, useToast, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/components/ui/FilePicker';
import { useState } from 'react';
import TextArea from '@/components/ui/TextArea';
import { useRouter } from 'next/navigation';
import { ServiceSchema } from '@/validation-schemas/service';
import { FC } from 'react';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { SERVICE_CATEGORIES } from '@/constants/optionsData';
import { createMeet } from '@/services/meets';

interface CreateServiceProps {}

const CreateMeet: FC<CreateServiceProps> = () => {
  const toast = useToast();
  const [createdMeetId, setCreatedMeetId] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ServiceSchema),
  });

  const { mutate: createMeetMutation, isLoading } = useMutation((user: any) => {
    return createMeet(user);
  });

  function onSubmit(values: any) {
    console.log(values);

    return;

    createMeetMutation(values, {
      onSuccess: (data) => {
        setCreatedMeetId(data._id);
      },
      onError: (error: any) => {
        toast({
          title: error.message,
          description: 'Something went wrong',
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

  return (
    <>
      <Modal
        title="Your meet is created"
        isOpen={!!createdMeetId}
        onClose={() => setCreatedMeetId(null)}
        actionTitle="Create"
        onAction={handleActionClick}
      >
        <Text>Now you can visit your meet.</Text>
      </Modal>
      <Flex>
        <Stack mx={'auto'} width={'xl'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <VStack>
                <Input placeholder="Enter service name" label="Name" error={errors.name?.message} register={register('name')} />
                <Select
                  error={errors.category?.message}
                  placeholder="Category"
                  options={SERVICE_CATEGORIES}
                  label="Category"
                  register={register('category')}
                />
                <TextArea
                  error={errors.description?.message}
                  label="Description"
                  register={register('description')}
                  placeholder="Add your service description here"
                />
                <FileUpload
                  placeholder="Select a banner"
                  previewType="banner"
                  onChange={handleBannerChange}
                  label="Banner"
                  name="banner"
                  accept="image/*"
                />
              </VStack>
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
        </Stack>
      </Flex>
    </>
  );
};

export default CreateMeet;
