import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';

const ProjectsContainer = ({ children }) => (
  <Box p={"8px 0px"}>
    <Grid gap="2">{children}</Grid>
  </Box>
);

export default ProjectsContainer;
