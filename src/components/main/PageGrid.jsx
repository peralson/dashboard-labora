import React from 'react';
import { Grid } from '@chakra-ui/layout';
import Menu from './Menu'

const PageGrid = ({ children }) => (
  <Grid
    pt={4}
    pb={4}
    columnGap="10"
    maxW="1200px"
    width="100%"
    templateColumns="2fr 13fr 6fr"
    margin="0 auto"
  >
    <Menu />
    {children}
  </Grid>
);

export default PageGrid;
