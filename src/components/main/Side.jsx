import React from 'react';
import { GridItem } from '@chakra-ui/layout';

const Side = ({ children }) => {
  return (
    <GridItem colSpan="6" bg="teal">
      {children}
    </GridItem>
  );
};

export default Side;
