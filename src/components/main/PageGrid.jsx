import React from 'react';
import { Grid, Flex } from '@chakra-ui/layout';

const PageGrid = ({ children }) => {
  return (
    <Flex width="100%" alignItems="flex-start" justifyContent="center">
      <Grid
        columnGap="4"
        maxW="1400px"
        width="100%"
        height="100%"
        templateColumns="repeat(20, 1fr)"
      >
        {children}
      </Grid>
    </Flex>
  );
};

export default PageGrid;
