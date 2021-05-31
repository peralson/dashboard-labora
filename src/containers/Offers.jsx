import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Context
import { SelectedItem } from '../context/SelectedItemContext'

// Lib
import { hasIndividualOffers } from '../lib/filtersValidation'

// Hooks & actions
import { connect } from 'react-redux'
import { fetchProjects } from '../store/actions/projects'

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    (async () => {
      setProjectsError(null);
      if (projects.length === 0) {
        setLoadingProjects(true);
      }
      try {
        await fetchProjects();
      } catch (error) {
        setProjectsError(error.message);
      } finally {
        setLoadingProjects(false);
      } 
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProjects]); 

  // SEARCH LOGIC
  const [search, setSearch] = useState("");

  const hasIndieOffers = hasIndividualOffers(projects);
  const [onlyOffers, setOnlyOffers] = useState(false);

  const [displayFilters, setDisplayFilters] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (onlyOffers) {
      return (
        project.projectData.name === null &&
        (
          project.projectData.location.address
          .toLowerCase()
          .includes(search.toLowerCase()) ||
          project.projectOffers.some(({ offerData }) =>
            offerData.name.toLowerCase().includes(search.toLowerCase()),
          )
        )
      );
    }
    return (
      project.projectData.name.toLowerCase().includes(search.toLowerCase()) ||
      project.projectData.location.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project.projectOffers.some(({ offerData }) =>
        offerData.name.toLowerCase().includes(search.toLowerCase()),
      )
    );
  });

  return (
    <SelectedItem.Provider value={{ selectedItem, setSelectedItem }}>
      <Main>
        <TopMain>
          <Flex>
            <SearchBar
              placeholder={"Busca por proyectos, ofertas o localización"}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Flex
              borderRadius={8}
              _hover={{ cursor: "pointer" }}
              border={"1px solid"}
              borderColor={"translucid"}
              bg={displayFilters && "darkLight"}
              ml={2}
              alignItems={"center"}
              px={4}
              onClick={() => setDisplayFilters(!displayFilters)}
            >
              <Text lineHeight={0} fontSize={14}>
                {!displayFilters ? "Filtros" : "Cerrar"}
              </Text>
            </Flex>
            <AccentButton>Crear oferta</AccentButton>
          </Flex>
          {displayFilters && (
            <Flex mt={2} alignItems={"center"}>
              {!hasIndieOffers && (
                <Flex>
                  <Text
                    fontSize={14}
                    borderRadius={8}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={"translucid"}
                    bg={onlyOffers && "darkLight"}
                    px={4}
                    py={2}
                    onClick={() => setOnlyOffers(!onlyOffers)}
                  >
                    Ver solo las ofertas
                  </Text>
                </Flex>
              )}
              {true && (
                <Flex flex={1} justifyContent={"flex-end"}>
                  <Text
                    color={"red.full"}
                    fontSize={14}
                    ml={2}
                    borderRadius={8}
                    _hover={{ bg: "red.smooth" }}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={"translucid"}
                    px={4}
                    py={2}
                    onClick={() => {
                      setOnlyOffers(false);
                      setDisplayFilters(false);
                    }}
                  >
                    Deshacer filtros
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </TopMain>
        {loadingProjects ? (
          <Text textAlign={"center"} py={10}>
            Cargando...
          </Text>
        ) : projectsError ? (
          <Text textAlign={"center"}>Vaya! Ha ocurrido un error</Text>
        ) : (
          <ProjectsContainer filteredProjects={filteredProjects} />
        )}
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
            {!selectedItem && (
              <BeCurious
                text={
                  "Prueba a seleccionar alguna solicitud o una oferta de algún proyecto"
                }
              />
            )}
          </Box>
        </SideSticky>
      </Side>
    </SelectedItem.Provider>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.allProjects,
  }
}

const mapDispatchToProps = {
  fetchProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
