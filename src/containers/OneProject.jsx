import React, { useState } from "react";
import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Custom
import { SelectedProject } from '../context/SelectedItemContext'
import { connect } from "react-redux";

// SVG
import calendar from "../assets/svg/calendar.svg";
import plus from "../assets/svg/plus.svg";

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

const OneProject = ({ match, history, projects }) => {
  const { id } = match.params;
  
  const project = projects.find(p => p.id === id);

  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  return (
    <SelectedProject.Provider value={{ selectedItemIndie, setSelectedItemIndie }}>
      <Main>
        <TopMain>
          <TopHeaderBar history={history} onEdit={() => console.log("Editing")}>
            Proyecto
          </TopHeaderBar>
        </TopMain>
        <Box pb={10}>
          <Grid
            columnGap={8}
            width={"100%"}
            templateColumns={"3fr 1fr"}
            my={4}
          >
            <Box>
              <TextInfo title="Nombre" info={project.projectData.name} mb={4} />
              <TextInfo title="Dirección" info={project.projectData.location.address} mb={4} />
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
          {project.projectOffers.length > 0 && (
            <>
              <Flex mb={2} alignItems={"center"}>
                <Text flex={1} fontSize={19} fontWeight={"bold"} lineHeight={2}>
                  Ofertas de este proyecto
                </Text>
                <Flex py={0.5} px={2} cursor={"pointer"} borderRadius={8} _hover={{ bg: "translucid" }}>
                  <Image src={plus} alt={"Añadir día"} mr={2} w={"12px"} />
                  <Text fontSize={14} color={"primary"} lineHeight={2}>
                    Añadir nueva oferta
                  </Text>
                </Flex>
              </Flex>
              <Grid
                w={"100%"}
                templateColumns={"1fr 1fr 1fr"}
                columnGap={4}
                rowGap={4}
              >
                {project.projectOffers.map(offer => (
                  <ProjectOfferItem key={offer.id} offer={offer} />
                ))}
              </Grid>
            </>
          )}
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
              <ProjectDatesSide id={project.id} dates={project.projectData.dates} />
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OneProject);
