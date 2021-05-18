import React from 'react';
import { GridItem } from '@chakra-ui/layout';

const Main = ({ children }) => {
  return (
    <GridItem colSpan="11" bg="tomato">
      {children}
    </GridItem>
  );
};

export default Main;
