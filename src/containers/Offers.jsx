import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'

// Hooks & actions
import { connect } from 'react-redux'
import { fetchProjects } from '../store/actions/projects'

// Context
import { SelectedItem } from '../context/SelectedItemContext'

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import Documentation from '../components/main/Documentation';
import ProjectsContainer from '../components/ui/ProjectsContainer';
import SearchBar from '../components/ui/SearchBar';
import ApplicationSide from '../components/ui/ApplicationSide';
import OfferSide from "../components/ui/OfferSide";
import AccentButton from "../components/ui/AccentButton";
import BeCurious from "../components/ui/BeCurious";

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
    if (search !== "") {
      return (
        project.projectData.name.toLowerCase().includes(search.toLowerCase()) ||
        project.projectOffers.some((offer) =>
          offer.offerData.name.toLowerCase().includes(search.toLowerCase()),
        )
      );
    }

    return true;
  })

  const handleSearch = event => {
    setSearch(event.target.value)
  }
  
  return (
    <>
      <Main>
        <TopMain>
          <Flex>
            <SearchBar
              placeholder="Busca entre tus proyectos"
              onChange={handleSearch}
            />
            <AccentButton>
              Crear oferta
            </AccentButton>
          </Flex>
        </TopMain>
        {loadingProjects
          ? <Text textAlign={"center"} py={10}>Cargando...</Text>
          : projectsError
            ? <Text textAlign={"center"}>Vaya! Ha ocurrido un error</Text>
            : <ProjectsContainer filteredProjects={filteredProjects} />
        }
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <Box p={4} w={"100%"} borderRadius={8} bg={"darkLight"}>
            {selectedItem && selectedItem.offerData && (
              <OfferSide data={selectedItem} />
            )}
            {selectedItem && selectedItem.offerCategory && (
              <ApplicationSide data={selectedItem} />
            )}
            {!selectedItem && <BeCurious text={"Prueba a seleccionar alguna solicitud o una oferta de algún proyecto"} />}
          </Box> 
        </SideSticky>
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
