import React, { useState, useEffect } from 'react';
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

const Offers = ({
  projects,
  fetchProjects
}) => {
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [projectsError, setProjectsError] = useState(null)

  useEffect(() => {
    (async () => {
      setProjectsError(null)
      if (!!projects) {
        setLoadingProjects(true)
      }
      try {
        await fetchProjects()
      } catch (error) {
        setProjectsError(error.message)
      } finally {
        setLoadingProjects(false)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjects])

  const handleSearch = e => {}
  
  return (
    <>
      <Main>
        <Box position="sticky" top={0} pt={4} width="100%" bg="dark">
          <Flex pb={4}>
            <SearchBar placeholder="Busca entre tus proyectos" onChange={handleSearch} />
            <Flex
              _hover={{ cursor: 'pointer' }}
              bg="accent"
              borderRadius={8}
              ml={2}
              alignItems="center"
              p="0px 16px"
            >
              <Text lineHeight={0} fontWeight="bold" fontSize="14px">Crear oferta</Text>
            </Flex>
          </Flex>
        </Box>
        {loadingProjects
          ? <Text>loading...</Text>
          : projectsError
            ? <Text>Hay un error</Text>
            : (
          <ProjectsContainer>
            {projects.map(project => (
              <ProjectItem
                key={project.id}
                projectData={project.projectData}
                projectOffers={project.projectOffers}
              />
            ))}
          </ProjectsContainer>
        )}
      </Main>
      <Side>
        <Flex
          position="sticky"
          top={0}
          h="100vh"
          flexDirection="column"
          alignItems="flex-start"
          p="16px 0px"
        >
          <Box p="8px 16px" borderRadius={8} borderColor="translucid" borderWidth={2}>
            <Text color="translucid">¿Qué puedo hacer aquí?</Text>
          </Box>
          <Box
            p={2}
            mt={2}
            borderRadius={8}
            bg="darkLight"
            h="100%"
            w="100%"
          ></Box>
        </Flex>
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
