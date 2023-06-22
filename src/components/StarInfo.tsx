import { Box, Center, Text, Stack, Button, List, ListItem, HStack } from "@chakra-ui/react";
import { Fragment } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

export function StarInfo({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }
    
  return (
    <Fragment>
        <div style={{
            position: "fixed",
            top: "0",
            left: "45%",
            transform: "translateY(5%)",
            maxHeight: "100vh",
            overflowY: "auto",
        }}>
        <Center py={6}>
            <Box 
                maxW={'800px'}
                w={'full'}
                h={"fit-content"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue('white', 'gray.700')}
                border={'1px solid'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                zIndex={10}
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
                        T Tau
                        </Text>
                    </Stack>
                </Stack>

               {/* eslint-disable-next-line react-hooks/rules-of-hooks*/}
                <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                    <HStack spacing={2}>
                    <List spacing={3}>
                        <ListItem>
                        <Text as="b">AUID:</Text> 000-000-000
                        </ListItem>
                        <ListItem>
                        <Text as="b">RA:</Text> 12h 34m 56s
                        </ListItem>
                        <ListItem>
                        <Text as="b">Dec:</Text> 10° 20' 30"
                        </ListItem>
                        <ListItem>
                        <Text as="b">Var. type:</Text> YSO
                        </ListItem>
                    </List>
                    <List spacing={3}>
                        <ListItem>
                        <Text as="b">Max. mag.:</Text> 10 V
                        </ListItem>
                        <ListItem>
                        <Text as="b">Min. mag.:</Text> 12 V
                        </ListItem>
                        <ListItem>
                        <Text as="b">Period:</Text> 320 days
                        </ListItem>
                        <ListItem>
                        <Text as="b">Spec. type:</Text> G2
                        </ListItem>
                    </List>
                    </HStack>
                    </Box>
                    { /*eslint-disable-next-line react-hooks/rules-of-hooks*/ }
                    <Box bg={useColorModeValue('gray.100', 'gray.800')} px={6} py={10}>
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
                    <Button
                        mt={10}
                        w={'full'}
                        bg={'blue.700'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 90 180 / 43%)'}
                        _hover={{
                        bg: 'blue.900',
                        }}
                        _focus={{
                        bg: 'blue.900',
                        }}>
                        View light curve
                    </Button>
                    </Box>
            </Box>
        </Center>
        </div>
    </Fragment>
  );
}

export default StarInfo;