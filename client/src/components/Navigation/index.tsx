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
import NavigationBar, { HeaderLinks } from './NavigationBar';
import { authStore } from '@/store/authStore';
import { navigationStore } from '@/store/navigationStore';
import { selectedLink } from '../../../hooks/selectedLink';
import { LuBookMarked } from 'react-icons/lu';
import { BsShop } from 'react-icons/bs';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import Link from 'next/link';
import { preferencesStore } from '@/store/preferencesStore';
import { useEffect, useState } from 'react';
import { CiChat2 } from 'react-icons/ci';
import { Roles } from 'enums/roles';
export interface LinkItemProps {
  name: string;
  path: string;
  role?: Roles;
  auth?: boolean;
  id: string;
  icon?: IconType;
}

export interface NavItemProps extends FlexProps {
  icon?: IconType;
  path: string;
  children: React.ReactNode;
  selected: boolean;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const DrawerLinks: Array<LinkItemProps> = [
  { id: '1', name: 'Profile', path: '/profile', role: Roles.ADMIN, icon: BsShop },
  { id: '2', name: 'Bookings', path: '/profile/bookings', role: Roles.ADMIN, icon: LuBookMarked },
  { id: '3', name: 'Messages', path: '/profile/messages', role: Roles.ADMIN, icon: CiChat2 },
  { id: '4', name: 'Meets', path: '/profile/meets', role: Roles.ADMIN, icon: HiOutlineVideoCamera },
  { id: '5', name: 'Bookings', path: '/user/bookings', role: Roles.USER, icon: IoBookOutline },
  { id: '6', name: 'Messages', path: '/user/messages', role: Roles.USER, icon: CiChat2 },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { selectedLink } = navigationStore((state) => state);
  const { roleView } = preferencesStore((state) => state);
  const [drawerLinks, setDrawerLinks] = useState<LinkItemProps[]>([]);

  useEffect(() => {
    if (roleView === Roles.ADMIN) {
      setDrawerLinks(DrawerLinks.filter((link) => link.role === Roles.ADMIN));
    } else {
      setDrawerLinks(DrawerLinks.filter((link) => link.role === Roles.USER));
    }
  }, [roleView]);

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
        {HeaderLinks.map((link, index) => (
          <Box key={index} width="100%">
            <NavItem selected={selectedLink == link.id} path={link.path} icon={link?.icon}>
              {link.name}
            </NavItem>
          </Box>
        ))}
      </VStack>
      {drawerLinks.map((link, index) => (
        <NavItem selected={selectedLink == link.id} key={index} path={link.path} icon={link?.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, selected, ...rest }: NavItemProps) => {
  return (
    <Link href={path}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={selected ? 'primary.500' : 'transparent'}
          _hover={{
            bg: 'primary.400',
            color: 'white',
            // height: '40px',
          }}
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
    </Link>
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
      <Box as="main" ml={{ base: 0, md: isLoggedIn ? 60 : 0 }} p="4">
        {props.children}
      </Box>
    </Box>
  );
};

export default NavigationDrawer;
