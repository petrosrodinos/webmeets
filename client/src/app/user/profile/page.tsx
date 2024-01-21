'use client';
import { Box, HStack, Stack, Button, useToast, Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { getUser, editUser } from '@/services/user';
import SignUp from 'app/auth/signup/page';
import { useMutation, useQuery } from 'react-query';

const UserProfile: FC = () => {
  const { data, isLoading } = useQuery('user', getUser);
  //   console.log(data);]

  const { mutate } = useMutation(() => {
    return editUser(data);
  });

  return (
    <>
      <SignUp data={data} onSave={mutate} />
    </>
  );
};

export default UserProfile;
