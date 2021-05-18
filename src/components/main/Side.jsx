import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

const Side = ({ children }) => (
  <Flex flexDirection="column">
      <Box position="fixed" bg="darkLight" height="400px" w="100%" maxW="328px" borderRadius="10px">
        {children}
      </Box>
  </Flex>
);

export default Side;
