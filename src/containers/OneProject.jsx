import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Custom
import { SelectedProject } from '../context/SelectedItemContext'
import { connect } from "react-redux";
import { deleteProject } from "../store/actions/projects";

// SVG
import calendar from "../assets/svg/calendar.svg";
import plus from "../assets/svg/plus.svg";
import plusWhite from "../assets/svg/plus-white.svg";
import task from "../assets/svg/task-to-do.svg";

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Side from "../components/main/Side";
import SideSticky from "../components/main/SideSticky";
import SideBoxContainer from "../components/ui/SideBoxContainer";
import BeCurious from "../components/ui/BeCurious";
import TopHeaderBar from "../components/ui/TopHeaderBar";
import SideSelectorProject from "../components/ui/SideSelectorProject";
import TextInfo from "../components/ui/TextInfo";
import Documentation from "../components/main/Documentation";
import ProjectDatesSide from "../components/ui/ProjectDatesSide";
import OfferSide from "../components/ui/OfferSide";
import ProjectOfferItem from "../components/ui/ProjectOfferItem";
import AccentButton from "../components/ui/AccentButton";
import DeleteButton from "../components/ui/DeleteButton";

const OneProject = ({
  match,
  history,
  projects,
  deleteProject
}) => {
  const { id } = match.params;
  
  const project = projects.find(p => p.id === id);

  const [loadingDel, setLoadingDel] = useState(false);
  const [errorDel, setErrorDel] = useState(false);
  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  if (!project) return <Box></Box>;

  const handleDeleteProject = () => {
    setErrorDel(null)
    setLoadingDel(true)
    deleteProject(id)
      .then(() => history.push('../../'))
      .catch(e => console.log(true))
      .finally(() => setLoadingDel(false))
  }

  return (
    <SelectedProject.Provider
      value={{ selectedItemIndie, setSelectedItemIndie }}
    >
      <Main>
        <TopMain>
          <TopHeaderBar
            onGoBack={() =>
              project.projectOffers.length !== 0
                ? history.goBack()
                : history.push(`../../`)
            }
            onEdit={() => console.log("Editing")}
          >
            Proyecto
          </TopHeaderBar>
        </TopMain>
        <Box pb={10}>
          {errorDel && (
            <Box py={3} px={4} borderRadius={10} bg={"red.smooth"} mt={4}>
              <Text color={"red.full"}>
                Ha habido un problema al borrar el proyecto. Inténtalo más tarde.
              </Text>
            </Box>
          )}
          <Grid columnGap={8} width={"100%"} templateColumns={"3fr 1fr"} my={6} mt={errorDel ? 4 : 6}>
            <Box>
              <TextInfo title="Nombre" info={project.projectData.name} mb={4} />
              <TextInfo
                title="Dirección"
                info={project.projectData.location.address}
                mb={4}
              />
              <TextInfo
                title="Descripción"
                info={project.projectData.description}
                minH={"120px"}
              />
            </Box>
            <Box>
              <SideSelectorProject
                mb={4}
                title={"Fechas"}
                desc={"Días laborales del proyecto"}
                image={calendar}
              />
            </Box>
          </Grid>
          <Flex mb={4} alignItems={"center"}>
            <Text flex={1} fontSize={19} fontWeight={"bold"}>
              Ofertas de este proyecto
            </Text>
            {project.projectOffers.length === 0 && (
              <Link to={`./${id}/nueva-oferta/`}>
                <AccentButton iconLeft={plusWhite} py={3.5}> 
                  Añadir una oferta
                </AccentButton>
              </Link>
            )}
          </Flex>
          {project.projectOffers.length !== 0 ? (
            <Grid
              w={"100%"}
              templateColumns={"1fr 1fr 1fr"}
              columnGap={4}
              rowGap={4}
            >
              {project.projectOffers.map((offer) => (
                <ProjectOfferItem key={offer.id} offer={offer} />
              ))}
              <Link to={`./${id}/nueva-oferta/`}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  py={4}
                  borderRadius={10}
                  borderWidth={1}
                  borderColor={"primary"}
                >
                  <Image src={plus} mr={2} w={"19px"} />
                  <Text fontSize={19} color={"primary"}>
                    Añadir oferta
                  </Text>
                </Flex>
              </Link>
            </Grid>
          ) : (
            <Flex w={"100%"} my={6} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
              <Image src={task} mb={4} w={"140px"} />
            </Flex>
          )}
          <Flex w={"100%"} mt={10}>
            <DeleteButton onDelete={handleDeleteProject} type={"el proyecto"}>
              {loadingDel ? 'Borrando...' : 'Eliminar proyecto'}
            </DeleteButton>
          </Flex>
        </Box>
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            {selectedItemIndie === null && (
              <BeCurious text={"Selecciona alguna oferta de este proyecto"} />
            )}
            {selectedItemIndie && selectedItemIndie === "Fechas" && (
              <ProjectDatesSide
                id={project.id}
                dates={project.projectData.dates}
              />
            )}
            {selectedItemIndie && selectedItemIndie.offerData && (
              <OfferSide data={selectedItemIndie} />
            )}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedProject.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {
  deleteProject
};

export default connect(mapStateToProps, mapDispatchToProps)(OneProject);
