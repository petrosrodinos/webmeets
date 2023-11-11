import { FC } from 'react';
import Image from 'next/image';
import { Box, Heading, Text, Stack, Avatar, useColorModeValue, Button } from '@chakra-ui/react';
import { Service } from '@/interfaces/service';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  service: Service;
  fromProfile?: boolean;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service: { id, name, description, category, banner, certificates, createdAt, profile, user },
  fromProfile = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (fromProfile) {
      router.push(`/profile/services/${id}`);
    } else {
      router.push(`/services/${id}`);
    }
  };

  return (
    <>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image src={banner} fill alt="service" />
        </Box>
        <Stack>
          <Text color={'green.500'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
            {category}
          </Text>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={profile.avatar} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>
              {user.firstname} {user.lastname}
            </Text>
            <Text color={'gray.500'}>{createdAt}</Text>
          </Stack>
        </Stack>
        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            onClick={handleClick}
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Visit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ServiceCard;
