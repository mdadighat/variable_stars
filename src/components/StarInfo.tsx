import { Box, Text, Stack, Button, List, ListItem, Grid } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";

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
        <Box 
            height="100%"
            display="flex"
            flexDirection="column"
        >
            <Stack
                textAlign="center"
                color={useColorModeValue('gray.800', 'white')}
                align="center"
                flexShrink={0}
                bg={useColorModeValue('blue.100', 'blue.900')}
                width="full"
                p={2}
                borderBottom="2px"
                borderColor={useColorModeValue('blue.200', 'blue.700')}
            >
                <Text 
                    fontSize="md"
                    fontWeight={700}
                    letterSpacing="wide"
                    color={useColorModeValue('blue.700', 'blue.100')}
                >
                    {starData.name}
                </Text>
            </Stack>

            <Box
                flex="1"
                overflow="auto"
            >
                <Box
                    bg={useColorModeValue('gray.100', 'gray.900')}
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Grid 
                        templateColumns="repeat(2, 1fr)" 
                        gap={4} 
                        p={4}
                    >
                        <Box>
                            <List spacing={1}>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>AUID:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.auid}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>RA:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.ra}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Dec:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.dec}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Var. type:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.varType}</Text>
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                            <List spacing={1}>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Max. mag.:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.maxMag}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Min. mag.:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.minMag}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Period:</Text>{' '}
                                    <Text as="span" fontSize="sm">
                                        {starData.period != null ? `${starData.period} days` : '—'}
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text as="b" fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>Spec. type:</Text>{' '}
                                    <Text as="span" fontSize="sm">{starData.specType}</Text>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Box p={4} flexShrink={0}>
                        <Button
                            width="full"
                            bg="blue.700"
                            color="white"
                            fontSize="sm"
                            _hover={{
                                bg: 'blue.900',
                            }}
                            onClick={() => window.open(`https://www.aavso.org/LCGv2/index.htm?DateFormat=Julian&RequestedBands=&view=api.delim&ident=${starData.name}&fromjd=2459399&tojd=2460129.702&delimiter=@@@`, "_blank")}
                        >
                            View light curve
                        </Button>
                    </Box>
                </Box>
            </Box>

            
        </Box>
    );
}

export default StarInfo;