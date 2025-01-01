import { ChangeEvent, ReactNode, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  DarkMode,
  Input,
  InputLeftElement,
  InputGroup,
  useToast,
  Select,
  Button,
  Center,
  chakra,
  InputRightElement,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  FiHome,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
} from 'react-icons/fi';
import {
  FaGithub,
   FaListUl,
   FaChartBar,
   FaBook
  } from 'react-icons/fa';
import {
    Route,
    Link as RouterLink, Routes
} from "react-router-dom";


import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


//import { ReactComponent as Logo } from '../assets/logo.svg';
import DarkLogo from '../assets/logo_dk.svg?react'
import {RootState} from '../Store.tsx';
import { useSelector, useDispatch } from 'react-redux'
import { updateLatitude, updateLongitude, updateDateTime } from './slices/ObserverSlice'
import StarDataTable from './StarDataTable';
import ObservationListTool from './ObservationListTool';
import BuyMeACoffeeButton from './BuyMeACoffeeButton.tsx';
import VisualizationTool from './VisualizationTool.tsx';
import Location from './Location.tsx';
import ObjectInfo from './ObjectInfo';


interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path:"/"},
    { name: "Observing", icon: FaListUl, path: "/observing"},
    { name: "Visualizations", icon: FaChartBar, path: "/visualizations"},
    { name: "Learn More", icon: FaBook, path:"/learn" },
    { name: "Settings", icon: FiSettings, path:"/settings" }
  ];



export default function SidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateTime = useSelector((state: RootState) => state.observer.dateTime)
  const latitude = useSelector((state: RootState) => state.observer.latitude)
  const longitude = useSelector((state: RootState) => state.observer.longitude)
  const dispatch = useDispatch()


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
      <Box 
        ml={{ base: 0, md: 60 }} 
        height="calc(100vh - 72px)"
        overflow="hidden"
        position="relative"
      >
        <Routes>
          <Route path="/" element={<ObjectInfo />}/>
          <Route path="/observing" element={<ObservationListTool />}/>
          <Route path="/visualizations" element={<VisualizationTool />}/>
        </Routes>
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
      zIndex={4}
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
      <VStack  p={2} position="absolute" bottom={0}>
        <Center p={2}>
          <Button
            color="gray.400"
            w={'full'}
            maxW={'md'}
            colorScheme={'whiteAlpha'}
            leftIcon={<FaGithub />}>
            <Center>
              <Text>View on Github</Text>
            </Center>
          </Button>
        </Center>
        <BuyMeACoffeeButton />
        <Text fontSize="xs" color ='white'>© 2024 Tauridos. All rights reserved</Text>
      </VStack>
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
  const toast = useToast();
  const dateTime = useSelector((state: RootState) => state.observer.dateTime);
  const dispatch = useDispatch();

  function handleDateTimeChange(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      dispatch(updateDateTime(event.currentTarget.value));
      toast({
        title: "Datetime change",
        description: event.currentTarget.value,
        status: 'success',
        duration: 4000,
        isClosable: true
      });
    }
  }
  


  const currDate = new Date();
  currDate.setMinutes(currDate.getMinutes() - currDate.getTimezoneOffset());
  useLayoutEffect(() => {
    dispatch(updateDateTime(currDate.toISOString().slice(0, 16)));
  }, []);

  const adjustDateTime = (hours: number) => {
    const currentDate = new Date(dateTime);
    
    // Adjust the time
    currentDate.setHours(currentDate.getHours() + hours);
    
    // Format the date to YYYY-MM-DDTHH:mm
    const newDateTime = currentDate.getFullYear() + '-' +
      String(currentDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(currentDate.getDate()).padStart(2, '0') + 'T' +
      String(currentDate.getHours()).padStart(2, '0') + ':' +
      String(currentDate.getMinutes()).padStart(2, '0');

    dispatch(updateDateTime(newDateTime));
  };

  const setNow = () => {
    const now = new Date();
    const nowString = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + 'T' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0');
    dispatch(updateDateTime(nowString));
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={2}
      minHeight="16"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        size="sm"
      />

      <Flex
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Location />

        <InputGroup 
          width={{ base: "100%", sm: "auto" }}
          minW={{ base: "unset", sm: "250px" }}
        >
          <Input
            placeholder="Date/Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => dispatch(updateDateTime(e.target.value))}
            pr="8rem"
            size="sm"
          />
          <InputRightElement width="8rem" height="100%">
            <Flex height="100%" alignItems="center" justifyContent="center">
              <HStack spacing={1}>
                <IconButton
                  aria-label="Decrease time by 1 hour"
                  icon={<ChevronLeftIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => adjustDateTime(-1)}
                />
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={setNow}
                >
                  Now
                </Button>
                <IconButton
                  aria-label="Increase time by 1 hour"
                  icon={<ChevronRightIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => adjustDateTime(1)}
                />
              </HStack>
            </Flex>
          </InputRightElement>
        </InputGroup>

        <IconButton
          size="sm"
          variant="ghost"
          aria-label="notifications"
          icon={<FiBell />}
          display={{ base: 'none', lg: 'flex' }}
        />

        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
};
