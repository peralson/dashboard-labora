import React, { useState, useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/layout';

// Context
import { SelectedItem } from '../context/SelectedItemContext';

// Lib
import {
  hasIndividualOffers,
  getCategoriesFromProjects,
  getFilteredProjects,
} from "../lib/filtersValidation";

// Hooks & actions
import { connect } from 'react-redux';
import { fetchProjects } from '../store/actions/projects';

// SVG
import plus from '../assets/svg/plus-white.svg';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SideBoxContainer from '../components/ui/SideBoxContainer';
import Documentation from '../components/main/Documentation';
import ProjectsContainer from '../components/ui/ProjectsContainer';
import SearchBar from '../components/ui/SearchBar';
import ApplicationSide from '../components/ui/ApplicationSide';
import OfferSide from '../components/ui/OfferSide';
import Popup from '../components/ui/Popup';
import AccentButton from '../components/ui/AccentButton';
import MultipleSelectList from '../components/ui/MultipleSelectList';
import BeCurious from '../components/ui/BeCurious';
import ProjectOrOffer from '../components/modals/ProjectOrOffer';

const Offers = ({ projects, fetchProjects }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  }, []);

  // SEARCH LOGIC
  const [displayFilters, setDisplayFilters] = useState(false);
  const [search, setSearch] = useState('');
  const categories = getCategoriesFromProjects(projects);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const hasIndieOffers = hasIndividualOffers(projects);
  const [filterCategories, setFilterCategories] = useState([]);
  const totalFilters = onlyOffers
    ? filterCategories.length + 1
    : filterCategories.length;

  const handleCategories = (e) => {
    if (!filterCategories.includes(e.target.name)) {
      setFilterCategories([...filterCategories, e.target.name]);
    } else {
      setFilterCategories(
        filterCategories.filter((cat) => cat !== e.target.name),
      );
    }
  };

  const filteredProjects = getFilteredProjects(
    projects,
    search,
    filterCategories,
    onlyOffers,
  );

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
              bg={(displayFilters || totalFilters > 0) && "darkLight"}
              ml={2}
              alignItems={"center"}
              px={4}
              onClick={() => setDisplayFilters(!displayFilters)}
            >
              <Text lineHeight={0} fontSize={14}>
                {!displayFilters
                  ? `Filtros${totalFilters > 0 ? ` (${totalFilters})` : ""}`
                  : "Cerrar filtros"}
              </Text>
            </Flex>
            <Popup
              show={modalOpen}
              title={"¿Qué quieres crear?"}
              body={<ProjectOrOffer />}
              handleShow={setModalOpen}
            >
              <AccentButton onClick={() => setModalOpen(true)} iconleft={plus}>
                Crear oferta
              </AccentButton>
            </Popup>
          </Flex>
          {displayFilters && (
            <Flex mt={2} alignItems={"center"}>
              {categories.length !== 0 && (
                <MultipleSelectList
                  title={`Categorías${
                    filterCategories.length > 0
                      ? ` (${filterCategories.length})`
                      : ""
                  }`}
                  bg={filterCategories.length !== 0 && "darkLight"}
                  current={filterCategories}
                  values={categories}
                  onChange={handleCategories}
                />
              )}
              {hasIndieOffers && (
                <Flex>
                  <Text
                    fontSize={14}
                    ml={2}
                    borderRadius={8}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={onlyOffers ? "translucid" : "darkLight"}
                    bg={onlyOffers && "darkLight"}
                    px={4}
                    py={2}
                    onClick={() => setOnlyOffers(!onlyOffers)}
                  >
                    Solo ofertas individuales
                  </Text>
                </Flex>
              )}
              {totalFilters > 0 && (
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
                      setFilterCategories([]);
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
          <SideBoxContainer>
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
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedItem.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {
  fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
