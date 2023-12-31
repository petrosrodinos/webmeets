'use client';
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
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/authStore';
import { FiHome, FiTrendingUp, FiCompass, FiSettings } from 'react-icons/fi';
import { LinkItemProps, NavItemProps } from '..';
import { navigationStore } from '@/store/navigationStore';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface AvatarMenuItemProps {
  name: string;
  onClick: () => void;
  path?: string;
}

export const NavigationLinks: LinkItemProps[] = [
  {
    name: 'Home',
    path: '/home',
    icon: FiHome,
  },
  {
    name: 'Meets',
    path: '/meets',
    icon: FiTrendingUp,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: FiCompass,
  },
  {
    name: 'About',
    path: '/about',
    icon: FiSettings,
  },
];

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
  const { selectedLink } = navigationStore((state) => state);
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleSignOut = () => {
    logOut();
    router.push('/auth/signin');
  };
  return (
    <Flex
      // position="fixed"
      w="100%"
      px={{ base: 4, md: 4 }}
      height="8vh"
      alignItems="center"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={'space-between'}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text color="primary.700" display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Webmeets
      </Text>
      <HStack spacing={8} alignItems={'center'}>
        <HStack as={'nav'} spacing={4} marginLeft={{ base: '50px', md: '250px' }} display={{ base: 'none', md: 'flex' }}>
          {NavigationLinks.map((link, index) => (
            <NavLink selectedLink={selectedLink} key={index} path={link.path} icon={link?.icon}>
              {link.name}
            </NavLink>
          ))}
        </HStack>
      </HStack>
      <Flex alignItems={'center'}>
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={colorMode === 'light' ? <BsSun /> : <BsMoonFill />}
          />

          {!isLoggedIn && (
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
              <Button cursor="pointer" onClick={() => router.push('/auth/signin')} as={'a'} fontSize={'sm'} fontWeight={400}>
                Sign In
              </Button>
              <Button
                cursor="pointer"
                onClick={() => router.push('/auth/signup')}
                as={'a'}
                // display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'primary.500'}
                _hover={{
                  bg: 'primary.600',
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
                    <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="0">
                      <Text>{username}</Text>
                      <Text fontSize="xs" color="primary.500">
                        {role}
                      </Text>
                    </VStack>
                    <FiChevronDown />
                  </HStack>
                </MenuButton>

                <MenuList
                  zIndex={100}
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
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
    </Flex>
  );
};

const NavLink = ({ icon, path, selectedLink, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      bg={selectedLink == path ? 'primary.500' : 'transparent'}
      _hover={{
        textDecoration: 'none',
        bg: 'primary.400',
      }}
      href={path}
      {...rest}
    >
      {children}
    </Box>
  );
};

const AvatarMenuItem = ({ name, onClick }: AvatarMenuItemProps) => {
  return (
    <MenuItem onClick={onClick}>
      <HStack>
        <Text fontSize="sm">{name}</Text>
      </HStack>
    </MenuItem>
  );
};

export default MobileNav;
