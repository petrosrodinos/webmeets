'use client';

import { Flex, Box, HStack, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input';
import { SignupSchema } from '@/validation-schemas/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { signUpUser } from '@/services/auth';
import { authStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const { logIn } = authStore((state) => state);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const { mutate: signupMutation, isLoading } = useMutation((user: any) => {
    return signUpUser(user);
  });

  function onSubmit(values: any) {
    signupMutation(
      {
        ...values,
        role: 'user',
      },
      {
        onSuccess: (data) => {
          logIn({
            ...data.user,
            token: data.token,
          });
          router.push('/home');
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  }

  return (
    <Flex>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
                  <Input label="First Name" error={errors.firstname?.message} register={register('firstname')} />
                </Box>
                <Box>
                  <Input label="Last Name" error={errors.lastname?.message} register={register('lastname')} />
                </Box>
              </HStack>
              <Input label="Phone Number" error={errors.phone?.message} register={register('phone')} />

              <Input label="Email address" error={errors.email?.message} register={register('email')} />

              <Input error={errors.password?.message} label="Password" isPassword={true} register={register('password')} />
              <Stack spacing={10} pt={2}>
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
              </Stack>
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
