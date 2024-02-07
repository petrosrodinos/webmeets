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
import { SignupSchema, EditUserSchema } from '@/validation-schemas/auth';
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
import { Roles } from 'enums/roles';
import { preferencesStore } from '@/store/preferencesStore';
import { FC, useEffect } from 'react';
import { SignUp as SignUpInt } from '@/interfaces/user';
import { get } from 'http';
import { formatDateToUTC } from '@/lib/date';
import { editUser } from '@/services/user';

interface SignUpProps {
  data?: SignUpInt;
  onSave?: () => void;
}

const SignUp: FC<SignUpProps> = ({ data, onSave }) => {
  const toast = useToast();
  const { logIn } = authStore((state) => state);
  const router = useRouter();
  const { setPreferences } = preferencesStore((state) => state);

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(!data ? SignupSchema : EditUserSchema),
  });

  const { mutate: signupMutation, isLoading } = useMutation((user: any) => {
    return signUpUser(user);
  });

  useEffect(() => {
    console.log('data', data);
    if (data) {
      reset({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        birthDate: formatDateToUTC(data.birthDate),
        avatar: data.avatar,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  function onSubmit(values: any) {
    console.log(values);
    // return;

    if (data) {
      console.log('updating');
      onSave?.();
      return;
    }

    signupMutation(
      {
        ...values,
        role: Roles.USER,
        birthDate: new Date(values.birthDate).toISOString(),
      },
      {
        onSuccess: (data) => {
          logIn({
            ...data.user,
            token: data.token,
            exp: data.exp,
            userId: data.user._id,
          });

          if (values.isBusiness) {
            setPreferences({
              roleView: Roles.ADMIN,
            });
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
      <Stack spacing={8} mx={'auto'} maxW={'xl'} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {!data ? 'Sign Up' : 'Update Profile'}
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {!data ? 'to enjoy all of our cool features ✌️' : 'You can change your profile information here'}
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
              {!data ? (
                <Input
                  error={errors?.password?.message as string}
                  label="Password"
                  placeholder="Enter Password"
                  password
                  icon={RiLockPasswordLine}
                  register={register('password')}
                />
              ) : null}

              <FileUpload onChange={handleImageChange} label="Avatar" name="profilePicture" value={getValues('avatar')} />

              {!data && (
                <>
                  <FormLabel>I have a business</FormLabel>
                  <Switch {...register('isBusiness')} colorScheme="pink" size="lg" />
                </>
              )}

              <Button
                isLoading={isLoading}
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'primary.500'}
                color={'white'}
                _hover={{
                  bg: 'primary.600',
                }}
              >
                {!data ? 'Sign Up' : 'Update Profile'}
              </Button>
              {!data ? (
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user?{' '}
                    <Link href="/auth/signin" color={'blue.400'}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              ) : null}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
