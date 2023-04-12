import { useEffect, useState } from 'react'
import axios from "axios";
import { ChakraProvider, ColorModeProvider, Img } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'

import { theme as proTheme } from '@chakra-ui/pro-theme'
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import {
  FaListUl
} from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as DarkLogo } from './assets/logo_dk.svg';
import { StarDataTable } from './StarDataTable';
import  SimpleThreeColumns  from './Lists.js';

const LinkItems = [
  { name: "Home", icon: FiHome, path:"/"},
  { name: "Lists", icon: FaListUl, path: "/lists"},
  { name: "Learn More", icon: FiStar, path:"/learn" },
  { name: "Settings", icon: FiSettings, path:"/settings" }
]


export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.green },
    config: {initialColorMode: 'light',
    useSystemColorMode: false},
  },
  proTheme,
)





function App({children}) {

   // new line start
  const [starsData, setStarsData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url:"/stars",
    })
    .then((response) => {
      const res =response.data
      setStarsData(({
        stars: res}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
  })}, []);
    //end of new line 
    const { colorMode } = useColorMode();
    const SidebarContent = ({ onClose, ...rest }) => {
      return (
        <Box
          transition="2s ease"
          bg={useColorModeValue("white", "gray.900")}
          borderRight="1px"
          borderRightColor={useColorModeValue("gray.200", "gray.700")}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
          {...rest}
        >
          <Flex h="20" alignItems="center" mx="18" justifyContent="space-between">

          <Box onClick="#" >{useColorModeValue(<Logo/>, <DarkLogo/>)}</Box>
            
   
            <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
          </Flex>
          
          {LinkItems.map(link => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
        </Box>
      )
    }

    const NavItem = ({ icon, path, children, ...rest }) => {
      return (
        <RouterLink
          to={path}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "orange.700",
              color: "white"
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white"
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </RouterLink>
      )
    }

    const MobileNav = ({ onOpen, ...rest }) => {
      const { colorMode, toggleColorMode } = useColorMode();
      return (
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue("white", "gray.900")}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue("gray.200", "gray.700")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
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
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Variable Stars
          </Text>
          <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton onClick={toggleColorMode} aria-label="toggle dark mode">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          /*<IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiSettings />}
          />*/
          {/*Profile menu goes here*/}
          </HStack>
        </Flex>
      )
    }
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    //const { colorMode, toggleColorMode } = useColorMode();
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.dark} />
        <ColorModeProvider>
        <Box minH="100vh" >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* main content*/}
          <Routes>
            <Route path="/" element={<StarDataTable starsData={starsData}/>}/>
            <Route path="/lists" element={SimpleThreeColumns()}/>
          </Routes>
        </Box>
      </Box>
        </ColorModeProvider>
      </ChakraProvider>
  );
}

export default App;