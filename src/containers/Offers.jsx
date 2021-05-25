import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'

// Hooks & actions
import { connect } from 'react-redux'
import { fetchProjects } from '../store/actions/projects'

// Context
import { SelectedItem } from '../context/SelectedItemContext'

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import Documentation from '../components/main/Documentation';
import ProjectItem from '../components/ui/ProjectItem';
import ProjectsContainer from '../components/ui/ProjectsContainer';
import SearchBar from '../components/ui/SearchBar';
import Separator from '../components/ui/Separator';
import ApplicationSide from '../components/ui/ApplicationSide';

const Offers = ({
  projects,
  fetchProjects
}) => {
  const [search, setSearch] = useState('')
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [projectsError, setProjectsError] = useState(null)
  const { selectedItem } = useContext(SelectedItem)

  useEffect(() => {
    (async () => {
      setProjectsError(null)
      if (projects.length === 0) {
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

  const filteredProjects = projects.filter(project => {
    if (search !== '') {
      return project.projectData.name.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  const handleSearch = event => {
    setSearch(event.target.value)
  }
  
  return (
    <>
      <Main>
        <Box position="sticky" top={0} pt={4} width="100%" bg="dark">
          <Flex>
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
          <Separator top={3} />
        </Box>
        {loadingProjects
          ? <Text>loading...</Text>
          : projectsError
            ? <Text>Hay un error</Text>
            : (
          <ProjectsContainer>
            {filteredProjects.map(project => (
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
          <Documentation />
          <Box p={4} w={"100%"} borderRadius={8} bg="darkLight">
            {selectedItem && selectedItem.offerData && <Text>Offer</Text>}
            {selectedItem && selectedItem.offerCategory && <ApplicationSide data={selectedItem} />}
            {!selectedItem && <Text>Selecciona algo</Text>}
          </Box>
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
