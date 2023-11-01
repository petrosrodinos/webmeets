'use client';

import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Textarea,
  Switch,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import FileUpload from '@/app/components/ui/FilePicker';
import { ProfileSchema } from '@/validation-schemas/profile';
import { createProfile } from '@/services/profile';
import { useState } from 'react';

export default function SignUp() {
  const toast = useToast();
  const [isOnSite, setIsOnSite] = useState(false);

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
    // return;
    createProfileMutation(values, {
      onSuccess: () => {
        toast({
          title: 'Profile created.',
          description: "We've created your profile for you.",
          position: 'top',
          isClosable: true,
          status: 'success',
        });
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
    ['city', 'area', 'address'].forEach((name: any) => {
      setValue(name, '');
    });
  };

  return (
    <>
      <Flex>
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
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
                <HStack>
                  <Box>
                    <Input label="Phone Number" error={errors.phone?.message} register={register('phone')} />
                  </Box>
                  <Box>
                    <Input label="Email address" error={errors.email?.message} register={register('email')} />
                  </Box>
                </HStack>

                <Select {...register('country')} placeholder="Country">
                  <option value="greece">Greece</option>
                  <option value="italy">Italy</option>
                  <option value="spain">Spain</option>
                </Select>

                <Textarea {...register('bio')} placeholder="Add your business bio here" />

                <FileUpload onChange={handleImageChange} label="Avatar" name="avatar" />

                <FileUpload onChange={handleImageChange} label="Banner" name="banner" />

                <FormLabel>I have on site business</FormLabel>
                <Switch onChange={handleChange} colorScheme="teal" size="lg" />

                {isOnSite && (
                  <HStack>
                    <Box>
                      <Input label="City" error={errors.city?.message} register={register('city')} />
                    </Box>
                    <Box>
                      <Input label="Area" error={errors.area?.message} register={register('area')} />
                    </Box>

                    <Box>
                      <Input label="Address" error={errors.address?.message} register={register('address')} />
                    </Box>
                  </HStack>
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
