import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import {FcInfo} from 'react-icons/fc';

export default function NotFound() {
  return (
    <Box  m={"5rem"} textAlign="center" py={10} px={6}>
      <Icon  as={FcInfo} boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        You don't have activities saved
      </Heading>
      <Text fontSize={"2xl"}  color={'gray.500'}>
        To save Barcelona events in your menu, go to all activities menu and hit the bookmark button 😉
      </Text>
    </Box>
  );
}