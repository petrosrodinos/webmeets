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
import { IoBookOutline } from 'react-icons/io5';
import { IconType } from 'react-icons';
import NavigationBar, { NavigationLinks } from './NavigationBar';
import { authStore } from '@/store/authStore';
import { navigationStore } from '@/store/navigationStore';
import { selectedLink } from '../../../hooks/selectedLink';
import { LuBookMarked } from 'react-icons/lu';
import { BsShop } from 'react-icons/bs';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
export interface LinkItemProps {
  name: string;
  path: string;
  icon?: IconType;
}

export interface NavItemProps extends FlexProps {
  icon?: IconType;
  path: string;
  children: React.ReactNode;
  selectedLink: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Personal Booking', path: '/bookings/user', icon: IoBookOutline },
  { name: 'Profile Bookings', path: '/bookings/profile', icon: LuBookMarked },
  { name: 'Meets', path: '/profile/meets', icon: HiOutlineVideoCamera },
  { name: 'Profile', path: '/profile', icon: BsShop },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { selectedLink } = navigationStore((state) => state);

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
        <Text color="primary.700" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          WebMeets
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack flexDirection="column" alignItems="flex-start" display={{ base: 'flex', md: 'none' }}>
        {NavigationLinks.map((link, index) => (
          <Box key={index} width="100%">
            <NavItem selectedLink={selectedLink} path={link.path} icon={link?.icon}>
              {link.name}
            </NavItem>
          </Box>
        ))}
      </VStack>
      {LinkItems.map((link, index) => (
        <NavItem selectedLink={selectedLink} key={index} path={link.path} icon={link?.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, selectedLink, ...rest }: NavItemProps) => {
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
          bg: 'primary.400',
          color: 'white',
          // height: '40px',
        }}
        bg={selectedLink == path ? 'primary.500' : 'transparent'}
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
  selectedLink();

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
