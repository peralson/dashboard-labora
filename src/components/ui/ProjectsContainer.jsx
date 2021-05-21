import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';

const ProjectsContainer = ({ children }) => (
  <Box bg="darkLight" p={4} pt={2} borderRadius={20}>
    <Grid gap="2">{children}</Grid>
  </Box>
);

export default ProjectsContainer;
