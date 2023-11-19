'use client';

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack,
} from '@chakra-ui/react';
import { FiTrendingUp, FiCompass, FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavigationBar, { NavigationLinks } from './NavigationBar';
import { authStore } from '@/store/authStore';

export interface LinkItemProps {
  name: string;
  path: string;
  icon?: IconType;
}

export interface NavItemProps extends FlexProps {
  icon?: IconType;
  path: string;
  children: React.ReactNode;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Bookings', path: '/bookings', icon: FiCompass },
  { name: 'Meets', path: '/profile/meets', icon: FiTrendingUp },
  { name: 'Profile', path: '/profile', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          WebMeets
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack flexDirection="column" alignItems="flex-start" display={{ base: 'flex', md: 'none' }}>
        {NavigationLinks.map((link) => (
          <Box width="100%">
            <NavItem key={link.name} path={link.path} icon={link?.icon}>
              {link.name}
            </NavItem>
          </Box>
        ))}
      </VStack>
      {LinkItems.map((link) => (
        <NavItem key={link.name} path={link.path} icon={link?.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.300',
          color: 'white',
        }}
        // bg={path == window?.location?.pathname ? 'cyan.400' : 'transparent'}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const NavigationDrawer = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = authStore();

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      {isLoggedIn && (
        <>
          <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="xs"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </>
      )}
      <NavigationBar onOpen={onOpen} />
      <Box as="main" ml={{ base: 0, md: 60 }} p="4">
        {props.children}
      </Box>
    </Box>
  );
};

export default NavigationDrawer;
