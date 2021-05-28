import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import ProjectItem from "./ProjectItem";

const ProjectsContainer = ({ filteredProjects }) => (
  <Box p={"8px 0px 32px 0px"}>
    <Grid gap="2">
      {filteredProjects.map((project) => (
        <ProjectItem
          key={project.id}
          id={project.id}
          projectData={project.projectData}
          projectOffers={project.projectOffers}
        />
      ))}
    </Grid>
  </Box>
);

export default ProjectsContainer;
