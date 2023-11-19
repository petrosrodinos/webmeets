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
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { SignupSchema } from '@/validation-schemas/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { signUpUser } from '@/services/auth';
import { authStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/ui/FilePicker';
import { Checkbox } from '@chakra-ui/react';
import { BsTelephone } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';

export default function SignUp() {
  const toast = useToast();
  const { logIn } = authStore((state) => state);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const { mutate: signupMutation, isLoading } = useMutation((user: any) => {
    return signUpUser(user);
  });

  function onSubmit(values: any) {
    console.log(values);
    // return;
    signupMutation(
      {
        ...values,
        role: values.isBusiness ? 'admin' : 'user',
        birthDate: new Date(values.birthDate).toISOString(),
      },
      {
        onSuccess: (data) => {
          logIn({
            ...data.user,
            token: data.token,
          });
          if (data.user.role === 'admin') {
            router.push('/profile');
          } else {
            router.push('/home');
          }
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
              description: 'Please try again later',
              position: 'top',
              isClosable: true,
              status: 'error',
            });
          }
        },
      },
    );
  }

  const handleImageChange = (data: any) => {
    setValue('avatar', data.file);
  };

  return (
    <Flex>
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <Input
                    label="First Name"
                    placeholder="Enter First Name"
                    error={errors.firstname?.message}
                    register={register('firstname')}
                    icon={IoPersonOutline}
                  />
                </Box>
                <Box>
                  <Input
                    label="Last Name"
                    placeholder="Enter Last Name"
                    error={errors.lastname?.message}
                    register={register('lastname')}
                    icon={IoPersonOutline}
                  />
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <Input
                    label="Phone Number"
                    placeholder="Enter Phone"
                    type="tel"
                    icon={BsTelephone}
                    error={errors.phone?.message}
                    register={register('phone')}
                  />
                </Box>
                <Box>
                  <Input
                    label="Email address"
                    placeholder="Enter Email"
                    error={errors.email?.message}
                    icon={TfiEmail}
                    register={register('email')}
                  />
                </Box>
              </HStack>
              <Input
                label="Date of Birth"
                placeholder="Enter Date Of Birth"
                error={errors.birthDate?.message}
                type="date"
                register={register('birthDate')}
              />
              <Input
                error={errors.password?.message}
                label="Password"
                placeholder="Enter Password"
                password
                icon={RiLockPasswordLine}
                register={register('password')}
              />

              <FileUpload onChange={handleImageChange} label="Avatar" name="profilePicture" />

              <FormLabel>I have a business</FormLabel>
              <Switch {...register('isBusiness')} colorScheme="teal" size="lg" />

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
                Sign up
              </Button>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link href="/auth/signin" color={'blue.400'}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
