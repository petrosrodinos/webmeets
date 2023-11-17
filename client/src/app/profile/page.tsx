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
  VStack,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/components/ui/FilePicker';
import { ProfileSchema } from '@/validation-schemas/profile';
import { createProfile } from '@/services/profile';
import { useState, FC } from 'react';
import TextArea from '@/components/ui/TextArea';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import TagSelector from '@/components/ui/TagSelector';
import { SERVICE_CATEGORIES_ARRAY } from '@/constants/optionsData';
import Select from '@/components/ui/Select';
import { COUNTRIES } from '@/constants/optionsData';
import { CreateProfile } from '@/interfaces/profile';

const Profile: FC = () => {
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

  const { mutate: createProfileMutation, isLoading } = useMutation((user: CreateProfile) => {
    return createProfile(user);
  });

  const onSubmit: SubmitHandler<any> = (values: CreateProfile) => {
    console.log(values);
    if (!isOnSite) {
      ['phone', 'city', 'area', 'address', 'postalCode'].forEach((name: string) => {
        delete values[name];
      });
    }
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
  };

  const handleImageChange = ({ file, name }: { file: File; name: any }) => {
    setValue(name, file);
  };

  const handleChange = (e: any) => {
    setIsOnSite(e.target.checked);
  };

  const handleTagChange = (name: any, items: string[]) => {
    setValue(name, items);
  };

  const handleActionClick = () => {
    setIsModalOpen(false);
    router.push('/profile/services');
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
        <Stack mx={'auto'} width={'lg'}>
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
                <Select register={register('country')} options={COUNTRIES} label="Country" placeholder="Select country" />

                <TagSelector
                  label="Select categories"
                  name="categories"
                  items={SERVICE_CATEGORIES_ARRAY}
                  onChange={handleTagChange}
                />

                <TextArea
                  error={errors.bio?.message}
                  label="Bio"
                  register={register('bio')}
                  placeholder="Add your business bio here"
                />
                <FileUpload accept="image/*" onChange={handleImageChange} label="Avatar" name="avatar" />

                <FileUpload accept="image/*" previewType="banner" onChange={handleImageChange} label="Banner" name="banner" />

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
};

export default Profile;
