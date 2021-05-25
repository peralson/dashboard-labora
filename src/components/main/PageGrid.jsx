import React from 'react';
import { Grid } from '@chakra-ui/layout';
import Menu from './Menu'

const PageGrid = ({ children }) => (
  <Grid
    columnGap="8"
    maxW="1400px"
    width="100vw"
    p={"0px 24px"}
    templateColumns="2fr 12fr 6fr"
    margin="0 auto"
  >
    <Menu />
    {children}
  </Grid>
);

export default PageGrid;
