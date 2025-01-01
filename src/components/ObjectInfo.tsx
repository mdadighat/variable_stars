import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import StarDataTable from './StarDataTable';
import { RootState } from '../Store';
import StarInfo from './StarInfo';

const ObjectInfo: React.FC = () => {
  const [topHeight, setTopHeight] = useState(65);
  const isDraggingRef = useRef(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Get selected star from store
  const selectedStar = useSelector((state: RootState) => state.starData.selectedStar);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const container = document.getElementById('object-info-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const percentage = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      setTopHeight(Math.min(Math.max(percentage, 20), 80));
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box 
      id="object-info-container" 
      height="100%" 
      display="flex" 
      flexDirection="column"
    >
      <Box
        height={`${topHeight}%`}
        overflow="auto"
        borderBottom="1px"
        borderColor={borderColor}
      >
        <StarDataTable />
      </Box>
      
      <Box
        height="6px"
        flexShrink={0}
        bg={useColorModeValue('gray.300', 'gray.700')}
        cursor="row-resize"
        onMouseDown={handleMouseDown}
        _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30px',
          height: '2px',
          borderRadius: 'full',
          bg: useColorModeValue('gray.500', 'gray.500'),
        }}
        _after={{
          content: '""',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateY(-2px)',
          width: '30px',
          height: '1px',
          borderRadius: 'full',
          bg: useColorModeValue('gray.500', 'gray.500'),
        }}
      />
      
      <Box
        height={`${100 - topHeight}%`}
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={4}
        p={4}
      >
        <Box
          bg={bgColor}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
          overflow="auto"
          display="flex"
          flexDirection="column"
        >
          {selectedStar ? (
            <StarInfo 
              isOpen={true}
              onClose={() => {}}
              starData={selectedStar}
            />
          ) : (
            <Text
              color="gray.500"
              textAlign="center"
              fontSize="md"
              mt={8}
            >
              Select a star from the table above to view details
            </Text>
          )}
        </Box>

        <Box
          bg={bgColor}
          p={4}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
        >
          <h3>Observing Plan TBD</h3>
        </Box>
      </Box>
    </Box>
  );
};

export default ObjectInfo;
