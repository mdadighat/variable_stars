import { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  DarkMode,
} from '@chakra-ui/react';
import {
  FiHome,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
} from 'react-icons/fi';
import {
    FaListUl
  } from 'react-icons/fa';
import {
    Route,
    Link as RouterLink, Routes
} from "react-router-dom";

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as DarkLogo } from '../assets/logo_dk.svg';
import Store from '../Store.tsx';
import StarDataTable from './StarDataTable';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path:"/"},
    { name: "Lists", icon: FaListUl, path: "/lists"},
    { name: "Learn More", icon: FiStar, path:"/learn" },
    { name: "Settings", icon: FiSettings, path:"/settings" }
  ];

export default function SidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" overflowX="scroll" bg={useColorModeValue('gray.100', 'gray.800')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" style={{ top:0, left:0,bottom:0}} >
       {/* main content*/}
       <Store>
          <Routes>
            <Route path="/" element={<StarDataTable />}/>
          </Routes>
        </Store>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      //bg={useColorModeValue('white', 'gray.900')}
      bgGradient='linear(to-b, gray.900, blue.900)'
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Box  >{<DarkLogo/>}</Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <DarkMode>
      {LinkItems.map((link) => (
        <NavItem color='white' key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
      </DarkMode>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <RouterLink
          to={path}
          style={{ textDecoration: "none" }}
        >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'orange.700',
          color: 'white',
        }}
        {...rest}>
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
    </RouterLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <><div style={{position:"sticky", top:0, left:0,right:0}} ><Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />} />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Variable Stars
      </Text>

      <HStack spacing={{ base: '0', md: '4' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />} />
        <ColorModeSwitcher />

      </HStack>
    </Flex>
    </div></>
  );
};
