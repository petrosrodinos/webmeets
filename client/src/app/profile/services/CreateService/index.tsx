'use client';

import { Flex, Stack, Button, useToast, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/app/components/ui/FilePicker';
import { useState } from 'react';
import TextArea from '../../../components/ui/TextArea';
import { useRouter } from 'next/navigation';
import { ServiceSchema } from '@/validation-schemas/service';
import { createService } from '@/services/service';
import { FC } from 'react';
import Modal from '@/app/components/ui/Modal';
import Select from '@/app/components/ui/Select';
import { SERVICE_CATEGORIES } from '@/constants/optionsData';
import MultiFilePicker from '@/app/components/ui/MultiFilePicker';
import { MultiFilePickerItemData } from '@/interfaces/components';

interface CreateServiceProps {}

const CreateService: FC<CreateServiceProps> = () => {
  const toast = useToast();
  const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ServiceSchema),
  });

  const { mutate: createServiceMutation, isLoading } = useMutation((user: any) => {
    return createService(user);
  });

  function onSubmit(values: any) {
    console.log(values);

    // return;

    createServiceMutation(values, {
      onSuccess: (data) => {
        setCreatedServiceId(data._id);
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

  const handleCertificatesSelect = (data: MultiFilePickerItemData[]) => {
    setValue('certificates', data);
  };

  const handleActionClick = () => {
    setCreatedServiceId(null);
    router.push(`/services/${createdServiceId}`);
  };

  return (
    <>
      <Modal
        title="Your service is created"
        isOpen={!!createdServiceId}
        onClose={() => setCreatedServiceId(null)}
        actionTitle="Create"
        onAction={handleActionClick}
      >
        <Text>Now you can create meets for this service.</Text>
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
                <MultiFilePicker
                  itemName="Certificate"
                  inputLabel="Name"
                  label="Add your Certificates"
                  accept=".pdf"
                  previewType="pdf"
                  onChange={handleCertificatesSelect}
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

export default CreateService;
