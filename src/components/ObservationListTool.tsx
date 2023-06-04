import { Box, Button, HStack, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
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
        <div >
        
            <HStack>
                <Box bg={useColorModeValue('gray.300', 'gray.700')} w="30%" color={useColorModeValue('black', 'gray.100')} id="starlist" maxHeight={"80vh"}>
                    <List overflowY={"scroll"} p={4} maxHeight={"80vh"}>
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
                </Box>
                <Tabs isFitted variant='enclosed'  bg={useColorModeValue('gray.300', 'gray.700')}  boxShadow='inner' w="70%" height={"80vh"}>
                    <TabList mb='1em'>
                        <Tab _selected={{ color: 'gray.100', bg: 'orange.800' }}>Target List</Tab>
                        <Tab _selected={{ color: 'gray.100', bg: 'orange.800' }}>ACP Plan</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel maxHeight={"80vh"}>
                        <Button marginBottom={5} marginRight={5}>Export as CSV</Button>
                        <Button marginBottom={5}>Export as TXT</Button>
                            {/*Table instead of list?*/}
                        <List overflowY={"scroll"} px={2} border={"1px"} maxHeight={"45vh"}>
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
                        <TabPanel maxHeight={"65vh"}>
                        <Button marginBottom={5} marginRight={5}>Export</Button>
                        <Text overflowY={"scroll"} maxHeight={"45vh"} border={"1px"}>
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
              
            </HStack>
        </div>
    )
}