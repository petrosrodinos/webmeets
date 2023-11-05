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
import Input from '../components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/app/components/ui/FilePicker';
import { ProfileSchema } from '@/validation-schemas/profile';
import { createProfile } from '@/services/profile';
import { useState } from 'react';
import TextArea from '../components/ui/TextArea';
import Modal from '../components/ui/Modal';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const toast = useToast();
  const [isOnSite, setIsOnSite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  });

  const { mutate: createProfileMutation, isLoading } = useMutation((user: any) => {
    return createProfile(user);
  });

  function onSubmit(values: any) {
    console.log(values);
    if (!isOnSite) {
      ['phone', 'city', 'area', 'address', 'postalCode'].forEach((name: any) => {
        delete values[name];
      });
    }
    setIsModalOpen(true);

    return;
    createProfileMutation(values, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
      onError: (error: any) => {
        if (error.statusCode == 409) {
          toast({
            title: error.message,
            description: 'Email or phone number already exists',
            position: 'top',
            isClosable: true,
            status: 'error',
          });
        } else {
          toast({
            title: error.message,
            description: 'Something went wrong',
            position: 'top',
            isClosable: true,
            status: 'error',
          });
        }
      },
    });
  }

  const handleImageChange = ({ file, name }: { file: File; name: any }) => {
    setValue(name, file);
  };

  const handleChange = (e: any) => {
    setIsOnSite(e.target.checked);
  };

  const handleActionClick = () => {
    setIsModalOpen(false);
    router.push('/services');
  };

  return (
    <>
      <Modal
        title="Your business profile is created!"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionTitle="Create your services"
        onAction={handleActionClick}
      >
        <Text>Now you can create your services and meets.</Text>
      </Modal>
      <Flex>
        <Stack mx={'auto'} width={'lg'} py={12}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Create Your Profile
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to be able to create Services and Meets ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Select {...register('country')} placeholder="Country">
                  <option value="greece">Greece</option>
                  <option value="italy">Italy</option>
                  <option value="spain">Spain</option>
                </Select>

                <TextArea error={errors.bio?.message} label="Bio" {...register('bio')} placeholder="Add your business bio here" />
                <FileUpload onChange={handleImageChange} label="Avatar" name="avatar" />

                <FileUpload previewType="banner" onChange={handleImageChange} label="Banner" name="banner" />

                <FormLabel>I have a physical business</FormLabel>
                <Switch {...register('isOnline')} onChange={handleChange} colorScheme="teal" size="lg" />

                {isOnSite && (
                  <VStack>
                    <Input label="Phone Number" error={errors.phone?.message} register={register('phone')} />
                    <Input label="City" error={errors.city?.message} register={register('city')} />
                    <Input label="Area" error={errors.area?.message} register={register('area')} />

                    <Input label="Address" error={errors.address?.message} register={register('address')} />

                    <Input label="Postal Code" error={errors.postalCode?.message} register={register('postalCode')} />
                  </VStack>
                )}

                <Button
                  isLoading={isLoading}
                  type="submit"
                  loadingText="Submitting"
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
}
