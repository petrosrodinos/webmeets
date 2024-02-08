'use client';
import { Box, HStack, Stack, Button, useToast, Flex, useColorModeValue, Heading } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { getUser, editUser } from '@/services/user';
import SignUp from 'app/auth/signup/page';
import { useMutation, useQuery } from 'react-query';

const UserProfile: FC = () => {
  const [newdata, setNewData] = useState({} as any);

  const { data, isLoading } = useQuery('user', getUser);
  //   console.log(data);]

  const { mutate } = useMutation(editUser);

  const updateUser = (values: any) => {
    console.log('values from profile without mutate', values);
    mutate(values, {
      onSuccess: (data: any) => {
        // console.log('data from profile', newData);
      },
    });
  };

  return (
    <>
      <SignUp
        data={data}
        // onSave={(values: any) => {
        //   updateUser(values);
        // }}
      />
    </>
  );
};

export default UserProfile;
