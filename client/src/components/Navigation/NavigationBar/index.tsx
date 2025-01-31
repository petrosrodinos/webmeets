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
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { BsMoonFill, BsSun, BsToggles2 } from "react-icons/bs";
import { FiHome, FiTrendingUp, FiCompass, FiSettings } from "react-icons/fi";
import { LinkItemProps, NavItemProps } from "..";
import { Roles } from "../../../enums/roles";
import { authStore } from "../../../store/authStore";
import { useSelectedLink } from "hooks/selectedLink";
import { preferencesStore } from "../../../store/preferencesStore";
import { Link, useNavigate } from "react-router-dom";
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface AvatarMenuItemProps {
  name: string;
  onClick: () => void;
  path?: string;
}

export const HeaderLinks: LinkItemProps[] = [
  {
    id: "7",
    name: "Home",
    path: "/home",
    icon: FiHome,
  },
  {
    id: "8",
    name: "Meets",
    path: "/meets",
    icon: FiTrendingUp,
  },
  {
    id: "9",
    name: "Contact",
    path: "/contact",
    icon: FiCompass,
  },
  {
    id: "10",
    name: "About",
    path: "/about",
    icon: FiSettings,
  },
];

const AvatarMenuItems = [
  {
    name: "Profile",
    onClick: () => {},
    path: "/profile",
  },
  {
    name: "Settings",
    onClick: () => {},
    path: "/settings",
  },
  {
    name: "Billing",
    onClick: () => {},
    path: "/billing",
  },
];

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, username, avatar, role, logOut } = authStore((state) => state);
  const { selectedLink } = useSelectedLink();
  const { colorMode, toggleColorMode } = useColorMode();
  const { setPreferences, roleView } = preferencesStore((state) => state);

  const toggleRoleView = () => {
    const newRoleView = roleView === "admin" ? "user" : "admin";
    setPreferences({ roleView: newRoleView });
  };

  const handleSignOut = () => {
    logOut();
    navigate("/auth/signin");
  };
  return (
    <Flex
      // position="fixed"
      w="100%"
      px={{ base: 4, md: 4 }}
      height="8vh"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={"space-between"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        color="primary.700"
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Webmeets
      </Text>
      <HStack spacing={8} alignItems={"center"}>
        <HStack
          as={"nav"}
          spacing={4}
          marginLeft={{ base: "50px", md: "250px" }}
          display={{ base: "none", md: "flex" }}
        >
          {HeaderLinks.map((link, index) => (
            <Link key={index} to={link.path}>
              <NavLink
                selected={selectedLink == link.id}
                key={index}
                icon={link?.icon}
                path={link.path}
              >
                {link.name}
              </NavLink>
            </Link>
          ))}
        </HStack>
      </HStack>
      <Flex alignItems={"center"}>
        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={colorMode === "light" ? <BsSun /> : <BsMoonFill />}
          />
          {isLoggedIn && role == Roles.ADMIN && (
            <IconButton
              onClick={toggleRoleView}
              size="lg"
              aria-label="open menu"
              icon={<BsToggles2 />}
            />
          )}

          {!isLoggedIn && (
            <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
              <Button
                cursor="pointer"
                onClick={() => navigate("/auth/signin")}
                fontSize={"sm"}
                fontWeight={400}
              >
                Sign In
              </Button>
              <Button
                cursor="pointer"
                onClick={() => navigate("/auth/signup")}
                // display={{ base: 'none', md: 'inline-flex' }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"primary.500"}
                _hover={{
                  bg: "primary.600",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
          {isLoggedIn && (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                  <HStack>
                    <Avatar size={"sm"} src={avatar} />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="0"
                    >
                      <Text>{username}</Text>
                      <Text fontSize="xs" color="primary.500">
                        {roleView}
                      </Text>
                    </VStack>
                    <FiChevronDown />
                  </HStack>
                </MenuButton>

                <MenuList
                  zIndex={100}
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  {AvatarMenuItems.map((item) => (
                    <AvatarMenuItem
                      key={item.name}
                      name={item.name}
                      onClick={item.onClick}
                      path={item.path}
                    />
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

const NavLink = ({ icon, path, selected, children, ...rest }: NavItemProps) => {
  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      bg={selected ? "primary.500" : "transparent"}
      _hover={{
        textDecoration: "none",
        bg: "primary.400",
        color: "white",
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
