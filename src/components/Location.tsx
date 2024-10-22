import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLatitude, updateLongitude } from './slices/ObserverSlice';
import { RootState } from '../Store';

const Location: React.FC = () => {
  const [latDMS, setLatDMS] = useState('');
  const [lonDMS, setLonDMS] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const latitude = useSelector((state: RootState) => state.observer.latitude);
  const longitude = useSelector((state: RootState) => state.observer.longitude);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      // Fetch browser location if not set
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude;
          const newLon = position.coords.longitude;
          dispatch(updateLatitude(newLat));
          dispatch(updateLongitude(newLon));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter it manually.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      );
    } else {
      setLatDMS(convertDecimalToDMS(latitude, true));
      setLonDMS(convertDecimalToDMS(longitude, false));
    }
  }, [latitude, longitude, dispatch, toast]);

  const convertDecimalToDMS = (decimal: number, isLatitude: boolean): string => {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutes = Math.floor((absolute - degrees) * 60);
    const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(2);
    const direction = isLatitude
      ? decimal >= 0 ? 'N' : 'S'
      : decimal >= 0 ? 'E' : 'W';
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  const convertDMSToDecimal = (dms: string): number | null => {
    const regex = /^(\d+)°(\d+)'([\d.]+)"([NSEW])$/;
    const match = dms.match(regex);
    if (!match) return null;

    const [, degrees, minutes, seconds, direction] = match;
    let decimal = parseInt(degrees) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600;
    if (direction === 'S' || direction === 'W') decimal = -decimal;
    return decimal;
  };

  const handleUpdate = () => {
    const newLat = convertDMSToDecimal(latDMS);
    const newLon = convertDMSToDecimal(lonDMS);
    if (newLat === null || newLon === null) {
      toast({
        title: "Invalid input",
        description: "Please enter valid DMS coordinates.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(updateLatitude(newLat));
    dispatch(updateLongitude(newLon));
    toast({
      title: "Location updated",
      description: `Lat: ${latDMS}, Lon: ${lonDMS}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex align="center" gap={2}>
        <Input
          value={latDMS}
          onChange={(e) => setLatDMS(e.target.value)}
          placeholder="Latitude (DMS)"
          size="sm"
          width="150px"
        />
        <Input
          value={lonDMS}
          onChange={(e) => setLonDMS(e.target.value)}
          placeholder="Longitude (DMS)"
          size="sm"
          width="150px"
        />
        <Button onClick={handleUpdate} size="sm" colorScheme="blue">
          Update
        </Button>
      </Flex>
    </Box>
  );
};

export default Location;
