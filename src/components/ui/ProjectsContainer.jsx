import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';

const ProjectsContainer = ({ children }) => (
  <Box bg="darkLight" p="16px" pt="8px">
    <Grid gap="2">{children}</Grid>
  </Box>
);

export default ProjectsContainer;
