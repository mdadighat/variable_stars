import { ChangeEvent, ReactNode, SetStateAction, useState } from 'react';
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
} from '@chakra-ui/react';
import {
  FiHome,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
} from 'react-icons/fi';
import {
  FaGithub,
   FaListUl
  } from 'react-icons/fa';
import {
    Route,
    Link as RouterLink, Routes
} from "react-router-dom";
//import useFieldFormatter from "format-as-you-type";

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


//import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as DarkLogo } from '../assets/logo_dk.svg';
import Store from '../Store.tsx';
import StarDataTable from './StarDataTable';
import ObservationListTool from './ObservationListTool';
import { SearchIcon } from '@chakra-ui/icons';
import BuyMeACoffeeButton from './BuyMeACoffeeButton.tsx';
import VisualizationTool from './VisualizationTool.tsx';


interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, path:"/"},
    { name: "Observing", icon: FaListUl, path: "/observing"},
    { name: "Visualizations", icon: FaListUl, path: "/visualizations"},
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
      <Box ml={{ base: 0, md: 60 }} paddingTop="20" style={{ top:0, left:0,bottom:0}} >
       {/* main content*/}
        <Store>
          
          <Routes>
            <Route path="/" element={<StarDataTable />}/>
            <Route path="/observing" element={<ObservationListTool />}/>
            <Route path="/visualizations" element={<VisualizationTool />}/>
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
        <Text fontSize="xs" color ='white'>© 2023 Tauridos. All rights reserved</Text>
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

  function handleDateChange(event: ChangeEvent<HTMLInputElement>): void {
    //throw new Error('Function not implemented.');
  }

  function handleTimeChange(event: ChangeEvent<HTMLInputElement>): void {
   // throw new Error('Function not implemented.');
  }
  
  
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    toast({
      title: "Search change",
      description: event.target.value,
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }

  function handleSearchSubmit(event: ChangeEvent<HTMLInputElement>): void {
      toast({
      title: "Search submit",
      description: event.target.value,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const [value, setValue] = useState('')
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => setValue(event.target.value)

  return (
    <><div style={{position:"fixed", top:0, left:0,right:0, zIndex:2}} ><Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      zIndex={40}
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
      <Select borderColor='blue.900' variant='filled' placeholder="What's up now?" size={"sm"}>
        <option value="tenStarN">10 Star Tutorial - N</option>
        <option value="tenStarS">10 Star Tutorial - S</option>
        <option value="yso">Young Stellar Objects</option>
      </Select>
      <InputGroup>
        <InputLeftElement pointerEvents='none' h="full">
          <SearchIcon color='gray.300'  />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="navBarSearch"
          data-testid="navBarSearch"
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          size='sm'
        />
      </InputGroup>
      <Input
        value={value}
        onChange={handleChange}
        defaultValue={"32.222607, -110.974711"}
        placeholder="Latitude, Longitude"
        size="sm"
      />
      <Input
        placeholder="Select Date and Time"
        type="datetime-local"
        defaultValue={"2023-06-01T20:00"}
        size='sm'
      />
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
