import React from 'react';
import { Grid } from '@chakra-ui/layout';

const PageGrid = ({ children }) => (
  <Grid
    columnGap="8"
    maxW="1200px"
    width="100%"
    templateColumns="2fr 13fr 6fr"
    margin="0 auto"
  >
    {children}
  </Grid>
);

export default PageGrid;
