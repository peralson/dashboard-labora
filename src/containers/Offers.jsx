import React, { useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'

// Hooks & actions
import { connect } from 'react-redux'
import { fetchProjects } from '../store/actions/projects'

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import ProjectItem from '../components/ui/ProjectItem';
import ProjectsContainer from '../components/ui/ProjectsContainer';
import SearchBar from '../components/ui/SearchBar';
import Separator from '../components/ui/Separator';

const Offers = ({
  projects,
  fetchProjects
}) => {

  useEffect(() => fetchProjects(), [fetchProjects])

  const handleSearch = e => {
    console.log(e.target.value);
  }
  
  return (
    <>
      <Main>
        <Box position="sticky" top={0} pt={4} width="100%" bg="dark">
          <Flex>
            <SearchBar placeholder="Busca entre tus proyectos" onChange={handleSearch} />
          </Flex>
          <Separator top={4} />
        </Box>
        <ProjectsContainer>
          {projects.map(project => (
            <ProjectItem
                key={project.id}
                projectData={project.projectData}
                projectOffers={project.projectOffers}
              />
          ))}
        </ProjectsContainer>
      </Main>
      <Side>
        <Box position="sticky" top={0} pt={4} width="100%">
          <Flex alignItems="center">
            <Text flex="1">Nuevo</Text>
            <Box
              p={2}
              _hover={{
                cursor: 'pointer'
              }}
              borderRadius={4}
              borderColor="accent"
              borderWidth={2}
              ml={2}
              minW="120px"
            >
              <Text fontSize="14px" textAlign="center" fontWeight="bold" color="accent">
                Oferta
              </Text>
            </Box>
            <Box
              p={2}
              _hover={{
                cursor: 'pointer'
              }}
              borderRadius={4}
              bg="accent"
              ml={2}
              minW="120px"
              borderColor="accent"
              borderWidth={2}
            >
              <Text fontSize="14px" textAlign="center" fontWeight="bold">
                Proyecto
              </Text>
            </Box>
          </Flex>
        </Box>
      </Side>
    </>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.allProjects
  }
}

const mapDispatchToProps = {
  fetchProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
