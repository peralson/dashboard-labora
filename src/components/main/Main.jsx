import React from 'react';
import { GridItem } from '@chakra-ui/layout';

const Main = ({ children }) => {
  return (
    <GridItem colSpan="11">
      {children}
    </GridItem>
  );
};

export default Main;
