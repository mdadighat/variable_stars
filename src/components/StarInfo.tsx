import { Box, Center, Text, Stack, Button, List, ListItem, HStack, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Fragment } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { CloseIcon } from "@chakra-ui/icons";

type props = {
    isOpen: boolean;
    onClose: () => void;
    starData: any;
}

export function StarInfo({ isOpen, onClose, starData }: props) {
    if (!isOpen) {
        return null;
    }

  return (
    <Fragment>
        <div style={{
            position: "fixed",
            transform: "translateY(50%)",
            maxHeight: "100vh",
            overflowY: "auto",
            zIndex:3
        }}>
            <IconButton 
                name="md-close"
                icon={<CloseIcon/>}
                size={"sm"}
                backgroundColor={"transparent"}
                onClick={onClose}
                style={{
                    position: 'absolute',
                    right: '15px',
                    top: '35px',
                }} aria-label={"close"}/>
        <Center py={6}>
            <Box 
                w={'full'}
                h={"fit-content"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.700')}
                border={'1px solid'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                > 
                <Stack
                    textAlign={'center'}
                    p={5}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    color={useColorModeValue('gray.800', 'white')}
                    align={'center'}>
            
                    <Text
                        fontSize={'sm'}
                        fontWeight={500}
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        bg={useColorModeValue('red.50', 'red.900')}
                        p={1}
                        px={3}
                        color={'red.400'}
                        rounded={'full'}>
                        Young Stellar Object
                    </Text>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                        <Text fontSize={'4xl'} fontWeight={600}>
                        {starData.name}
                        </Text>
                    </Stack>
                </Stack>
                <Flex>
               {/* eslint-disable-next-line react-hooks/rules-of-hooks*/}
                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                        <HStack spacing={2}>
                            <List spacing={3}>
                                <ListItem>
                                <Text as="b">AUID:</Text> {starData.auid}
                                </ListItem>
                                <ListItem>
                                <Text as="b">RA:</Text> {starData.ra}
                                </ListItem>
                                <ListItem>
                                <Text as="b">Dec:</Text> {starData.dec}
                                </ListItem>
                                <ListItem>
                                <Text as="b">Var. type:</Text> {starData.varType}
                                </ListItem>
                            </List>
                            <List spacing={3}>
                                <ListItem>
                                <Text as="b">Max. mag.:</Text> {starData.maxMag}
                                </ListItem>
                                <ListItem>
                                <Text as="b">Min. mag.:</Text> {starData.minMag}
                                </ListItem>
                                <ListItem>
                                <Text as="b">Period:</Text> {starData.period} days
                                </ListItem>
                                <ListItem>
                                <Text as="b">Spec. type:</Text> {starData.specType}
                                </ListItem>
                            </List>
                        </HStack>
                    </Box>
                    { /*eslint-disable-next-line react-hooks/rules-of-hooks*/ }
                    <Box bg={useColorModeValue('gray.100', 'gray.800')} px={6} py={10} flex="1">
                        <List spacing={3}>
                            <ListItem>
                                <Text as="b">Rise:</Text> 8:30 PM
                            </ListItem>
                            <ListItem>
                                <Text as="b">Transit:</Text> 11:32 PM
                            </ListItem>
                            <ListItem>
                                <Text as="b">Set:</Text> 12:54 AM
                            </ListItem>
                        </List>

                        </Box>
                    </Flex>
                    <Center>
                        <Button
                            margin={5}
                            w={'fit-content'}
                            bg={'blue.700'}
                            color={'white'}
                            rounded={'xl'}
                            onClick={()=> window.open("https://www.aavso.org/LCGv2/index.htm?DateFormat=Julian&RequestedBands=&view=api.delim&ident=" +
                                            starData.name + "&fromjd=2459399&tojd=2460129.702&delimiter=@@@", "_blank")}
                            boxShadow={'0 5px 20px 0px rgb(72 90 180 / 43%)'}
                            _hover={{
                            bg: 'blue.900',
                            }}
                            _focus={{
                            bg: 'blue.900',
                            }} 
                            >
                            View light curve
                        </Button>
                    </Center>
            </Box>
        </Center>
        </div>
    </Fragment>
  );
}

export default StarInfo;