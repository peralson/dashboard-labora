import React from 'react';
import { Grid } from '@chakra-ui/layout';
import Menu from './Menu'

const PageGrid = ({ children }) => (
  <Grid
    columnGap={6}
    maxW={"1400px"}
    width={"100vw"}
    px={6}
    templateColumns={"160px 12fr 6fr"}
    mx={"auto"}
  >
    <Menu />
    {children}
  </Grid>
);

export default PageGrid;
