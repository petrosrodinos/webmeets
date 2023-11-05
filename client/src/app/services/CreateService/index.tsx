'use client';

import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Switch,
  FormLabel,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/app/components/ui/FilePicker';
import { ProfileSchema } from '@/validation-schemas/profile';
import { createProfile } from '@/services/profile';
import { useState } from 'react';
import TextArea from '../../components/ui/TextArea';
import Modal from '../../components/ui/Modal';
import { useRouter } from 'next/navigation';
import { ServiceSchema } from '@/validation-schemas/service';
import Tag from '@/app/components/ui/Tag';
import TagSelector from '@/app/components/ui/TagSelector';
import { SERVICE_CATEGORIES } from '@/constants/serviceCategories';

export default function CreateService() {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    return createProfile(user);
  });

  function onSubmit(values: any) {
    console.log(values);

    return;
    createServiceMutation(values, {
      onSuccess: () => {
        setIsModalOpen(true);
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

  const handleFileChange = ({ file, name }: { file: File; name: any }) => {
    setValue(name, file);
  };

  const handleTagChange = (name: any, items: string[]) => {
    setValue(name, items);
  };

  return (
    <>
      <Flex>
        <Stack mx={'auto'} width={'xl'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <VStack>
                <Input placeholder="Enter service name" label="Name" error={errors.name?.message} register={register('name')} />
                <TextArea
                  error={errors.description?.message}
                  label="Bio"
                  {...register('description')}
                  placeholder="Add your service description here"
                />
                <TagSelector label="Select categories" name="categories" items={SERVICE_CATEGORIES} onChange={handleTagChange} />
                <FileUpload
                  placeholder="Select a banner"
                  previewType="banner"
                  onChange={handleFileChange}
                  label="Banner"
                  name="banner"
                />
                <FileUpload
                  placeholder="Add certificate"
                  previewType="banner"
                  onChange={handleFileChange}
                  label="Certificate"
                  name="certificate"
                />
              </VStack>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  );
}
