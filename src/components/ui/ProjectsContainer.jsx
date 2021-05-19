import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';

const ProjectsContainer = ({ children }) => (
  <Box bg="darkLight" borderRadius="20px" p={4}>
    <Grid gap="2">{children}</Grid>
  </Box>
);

export default ProjectsContainer;
