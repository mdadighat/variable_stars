import { Box, Button, Center, Container, Flex, HStack, Heading, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useEffect } from "react";

export default function ObservationListTool() {
    useEffect(() => {
        function handleContextMenu(e: { preventDefault: () => void; }) {
          e.preventDefault(); // prevents the default right-click menu from appearing
        }
        // add the event listener to the component's root element
        const rootElement = document.getElementById('starlist');
        if (rootElement){
        rootElement.addEventListener('contextmenu', handleContextMenu);
        // remove the event listener when the component is unmounted
    
        return () => {
          rootElement.removeEventListener('contextmenu', handleContextMenu);
        };} 
      }, []);
    
    return(
            <Box zIndex={1}>
                <Flex color='white'>
                    <Box w='300px' color={useColorModeValue('black', 'gray.100')} data-testid="targetList">
                        <VStack w={"full"} p={3}>
                            <Heading as='h2' size='md'marginTop={"3"} textAlign={"center"} marginBottom={"4"}>Observing program stars</Heading>
                            <List border={"1px"} overflowY={"auto"} width={"100%"} p={4}  >
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                                <ListItem>Star name</ListItem>
                            </List>
                        </VStack>
                    </Box>
                    <Box flex='1' data-testid="targetPlan">
                        <Tabs isFitted variant='enclosed' bg={useColorModeValue('gray.300', 'gray.700')}  
                            color={useColorModeValue('black', 'gray.100')} boxShadow='inner' w={"full"}>
                            <TabList >
                                <Tab _selected={{ color: 'gray.100', bg: 'orange.800' }}>Target List</Tab>
                                <Tab _selected={{ color: 'gray.100', bg: 'orange.800' }}>ACP Plan</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel >
                                    <Button marginBottom={2} marginRight={5} bg={"orange.300"} color={"black"} position="sticky" zIndex={1}>Export as CSV</Button>
                                    <Button marginBottom={2} bg={"orange.300"} color={"black"}>Export as TXT</Button>
                                        {/*Table instead of list?*/}
                                    <List overflowY={"scroll"} bg={useColorModeValue('gray.100', 'gray.800')} px={2} border={"1px"}>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                        <ListItem>Star name</ListItem>
                                    </List>
                                </TabPanel>
                                <TabPanel >
                                    <Button marginBottom={2} marginRight={5} bg={"orange.300"} color={"black"}>Export</Button>
                                            <Text   w={"full"} bg={useColorModeValue('gray.100', 'gray.800')}   border={"1px"}>
                                            <p>#WAITUNTIL 1, 01-05-2020 01:56<br/>
                                            #SHUTDOWNAT 01-05-2020 12:55<br/>
                                            #CHILL -20.0<br/>
                                            #AUTOFOCUS<br/>
                                            </p><br/>

                                            <p>#WAITAIRMASS 1.4, 5<br/>
                                            #FILTER B,V,R,I<br/>
                                            #BINNING 1,1,1,1<br/>
                                            #COUNT 1,1,1,1<br/>
                                            #INTERVAL 180,60,30,30<br/>
                                            #POSANG 185.0<br/>
                                            RZ Psc	01h09m42s	+27d57m01s</p><br/>

                                            <p>#WAITAIRMASS 1.4, 5<br/>
                                            #FILTER B,V,R,I<br/>
                                            #BINNING 1,1,1,1<br/>
                                            #COUNT 1,1,1,1<br/>
                                            #INTERVAL 180,60,30,30<br/>
                                            #POSANG 185.0<br/>
                                            RZ Psc	01h09m42s	+27d57m01s</p><br/>

                                            <p>#WAITAIRMASS 1.4, 5<br/>
                                            #FILTER B,V,R,I<br/>
                                            #BINNING 1,1,1,1<br/>
                                            #COUNT 1,1,1,1<br/>
                                            #INTERVAL 180,60,30,30<br/>
                                            #POSANG 185.0<br/>
                                            RZ Psc	01h09m42s	+27d57m01s</p><br/>
                                            </Text>
                                        
                                 </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>
            </Box> 
    
    )
}