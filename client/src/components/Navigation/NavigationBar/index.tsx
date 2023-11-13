import {
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  MenuList,
  MenuItem,
  MenuDivider,
  FlexProps,
  Text,
  Box,
  Button,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface AvatarMenuItemProps {
  name: string;
  onClick: () => void;
  path?: string;
}

const AvatarMenuItems = [
  {
    name: 'Profile',
    onClick: () => {},
    path: '/profile',
  },
  {
    name: 'Settings',
    onClick: () => {},
    path: '/settings',
  },
  {
    name: 'Billing',
    onClick: () => {},
    path: '/billing',
  },
];

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { isLoggedIn, username, avatar, role, logOut } = authStore((state) => state);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleSignOut = () => {
    logOut();
    router.push('/auth/signin');
  };
  return (
    <Flex
      // position="fixed"
      // w="83%"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="8vh"
      alignItems="center"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Webmeets
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />

        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === 'light' ? <BsSun /> : <BsMoonFill />}
        />

        {!isLoggedIn && (
          <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
            <Button onClick={() => router.push('/auth/signin')} as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'}>
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/auth/signup')}
              as={'a'}
              // display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
        {isLoggedIn && (
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar size={'sm'} src={avatar} />
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                    <Text fontSize="sm">{username}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {role}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>

              <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                {AvatarMenuItems.map((item) => (
                  <AvatarMenuItem key={item.name} name={item.name} onClick={item.onClick} path={item.path} />
                ))}
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </HStack>
    </Flex>
  );
};

const AvatarMenuItem = ({ name, onClick, path }: AvatarMenuItemProps) => {
  return (
    <MenuItem onClick={onClick}>
      <HStack>
        <Text fontSize="sm">{name}</Text>
      </HStack>
    </MenuItem>
  );
};

export default MobileNav;
