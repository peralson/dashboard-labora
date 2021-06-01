import React from 'react';
import { Box } from '@chakra-ui/layout';

const Side = ({ children }) => (
  <Box position={"sticky"} top={0}>
    {children}
  </Box>
);

export default Side;
