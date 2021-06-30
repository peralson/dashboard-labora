import React from 'react';
import { Box, Grid } from '@chakra-ui/layout';
import ProjectItem from "./ProjectItem";
import NoContent from "./NoContent";

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
      {filteredProjects.length === 0 && (
        <NoContent
          what={"ofertas."}
          how={
            "Puedes empezar por crear una oferta individual o un proyecto multi oferta"
          }
          cta={"Crear Oferta Individual"}
          url={`../ofertas/nueva-oferta/`}
        />
      )}
    </Grid>
  </Box>
);

export default ProjectsContainer;
