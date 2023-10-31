'use client';

import Input from '@/app/components/ui/Input';
import { signInUser } from '@/services/auth';
import { authStore } from '@/store/authStore';
import { SignInSchema } from '@/validation-schemas/auth';
import { Flex, Box, Checkbox, Stack, Button, Heading, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const { logIn } = authStore((state) => state);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const { mutate: signupMutation, isLoading } = useMutation((user: any) => {
    return signInUser(user);
  });

  function onSubmit(values: any) {
    signupMutation(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
        });
        router.push('/home');
      },
      onError: (error: any) => {
        if (error.statusCode == 403) {
          toast({
            title: error.message,
            description: 'Please check your credentials',
            position: 'top',
            isClosable: true,
            status: 'error',
          });
        }
      },
    });
  }
  return (
    <Flex width="100%">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Input label="Email address" error={errors.email?.message} register={register('email')} />
              <Input error={errors.password?.message} label="Password" isPassword={true} register={register('password')} />

              <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'column' }} align={'start'} justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={'blue.400'}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
