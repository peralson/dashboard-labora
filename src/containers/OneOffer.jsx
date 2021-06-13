import React, { useState } from 'react';
import { Flex, Box, Text, Grid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Custom
import { connect } from 'react-redux';
import { deleteProjectOffer, deleteProject } from '../store/actions/projects'
import { formattedSalary } from '../lib/formattedSalary';

// Context
import { SelectedItemIndie } from '../context/SelectedItemContext';

// SVG
import legal from '../assets/svg/legal.svg';
import schedule from '../assets/svg/schedule.svg';
import team from '../assets/svg/team.svg';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SideBoxContainer from '../components/ui/SideBoxContainer';
import Documentation from '../components/main/Documentation';
import SideSelectorOffer from '../components/ui/SideSelectorOffer';
import OneOfferApplication from '../components/ui/OneOfferApplication';
import TextInfo from '../components/ui/TextInfo';
import ScheduleSide from '../components/ui/ScheduleSide';
import LegalSide from '../components/ui/LegalSide';
import TeamSide from "../components/ui/TeamSide";
import TopHeaderBar from '../components/ui/TopHeaderBar';
import ApplicationSide from '../components/ui/ApplicationSide';
import BeCurious from '../components/ui/BeCurious';
import DeleteButton from '../components/ui/DeleteButton';
import ErrorMessage from '../components/ui/ErrorMessage';

const OneOffer = ({ match, history, projects, deleteProjectOffer, deleteProject }) => {
  const { id } = match.params;

  const [loadingDel, setLoadingDel] = useState(false);
  const [errorDel, setErrorDel] = useState(null);
  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  const project = projects.find(({ projectOffers }) =>
    projectOffers.some((offer) => offer.id === id),
  );

  if (!project) return <Box></Box>;

  const offer = project.projectOffers.find((offer) => offer.id === id);

  if (!offer) return <Box></Box>;

  const isComplete = offer.offerData.qty === offer.offerData.already_assigned;
  const isSingle = project.projectData.name === null;

  const handleDeleteOffer = () => {
    setErrorDel(null);
    setLoadingDel(true);
    if (isSingle) {
      deleteProjectOffer(project.id, offer.id)
        .then(() => history.push("../../"))
        .catch((e) => setErrorDel(true))
        .finally(() => setLoadingDel(false));
    } else {
      deleteProject(project.id)
        .then(() => history.push("../../"))
        .catch((e) => setErrorDel(true))
        .finally(() => setLoadingDel(false));
    }
  };

  return (
    <SelectedItemIndie.Provider
      value={{ selectedItemIndie, setSelectedItemIndie }}
    >
      <Main>
        <TopMain>
          <TopHeaderBar
            onGoBack={() => history.push(`../../`)}
            onEdit={() =>
              history.push(`/ofertas/o/edit${isSingle ? "-single" : ""}/${id}`)
            }
          >
            Oferta
          </TopHeaderBar>
        </TopMain>
        <Box pb={10}>
          {errorDel && (
            <ErrorMessage
              title={"Ha habido un error al intentar borrar la oferta."}
              secondary={"Inténtalo más tarde."}
              onClose={() => setErrorDel(null)}
            />
          )}
          {project.projectData.name && (
            <Flex mt={2} alignItems={"flex-end"} justifyContent={"flex-end"}>
              <Text fontSize={14} lineHeight={1.5}>
                Esta oferta pertenece al proyecto:
              </Text>
              <Link to={`../../ofertas/p/${project.id}`}>
                <Text
                  color={"primary"}
                  ml={2}
                  fontSize={14}
                  lineHeight={1.35}
                  _hover={{ textDecoration: "underline" }}
                >
                  {project.projectData.name}
                </Text>
              </Link>
            </Flex>
          )}
          <Grid columnGap={8} width={"100%"} templateColumns={"3fr 1fr"} my={4}>
            <Box>
              <Grid gap={4} width={"100%"} templateColumns={"1fr 1fr"} mb={4}>
                <TextInfo title="Nombre" info={offer.offerData.name} />
                <TextInfo title="Categoría" info={offer.offerData.category} />
                <TextInfo
                  title="Salario"
                  info={formattedSalary(offer.offerData.salary) + "€"}
                />
                <TextInfo
                  title="Horas extra"
                  info={formattedSalary(offer.offerData.extraSalary) + "€"}
                />
                <TextInfo title="Cantidad" info={offer.offerData.qty} />
              </Grid>
              {!project.projectData.name && (
                <TextInfo
                  title="Dirección"
                  info={project.projectData.location.address}
                  mb={4}
                />
              )}
              {offer.offerData.tags && offer.offerData.tags.length > 0 && (
                <Box mb={4}>
                  <Text mb={2} fontSize={14} fontWeight={"bold"} lineHeight={2}>
                    Etiquetas
                  </Text>
                  <Flex>
                    {offer.offerData.tags.map((tag, index) => (
                      <Text
                        key={index}
                        ml={index !== 0 && 2}
                        py={1}
                        px={2}
                        borderWidth={2}
                        borderRadius={8}
                        borderColor={"darkLight"}
                        color={"primary"}
                      >
                        #{tag}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
              {offer.offerData.description && (
                <TextInfo
                  title="Requerimientos"
                  info={offer.offerData.description}
                  minH={"110px"}
                />
              )}
            </Box>
            <Box>
              <SideSelectorOffer
                mb={4}
                title={"Legal"}
                desc={"Contrato, nóminas..."}
                image={legal}
              />
              <SideSelectorOffer
                mb={3}
                title={"Horario"}
                desc={"Horas totales, turnos..."}
                image={schedule}
              />
              {offer.offerData.already_assigned > 0 && (
                <SideSelectorOffer
                  title={"Equipo"}
                  desc={
                    offer.offerData.already_assigned === 1
                      ? `${offer.offerData.already_assigned} persona`
                      : `${offer.offerData.already_assigned} personas`
                  }
                  image={team}
                />
              )}
            </Box>
          </Grid>
          {offer.offerApplications.length > 0 && !isComplete && (
            <>
              <Text mb={2} fontWeight={"bold"} lineHeight={2}>
                Solicitudes de esta oferta
              </Text>
              <Grid w={"100%"} templateColumns={"1fr 1fr 1fr"} gap={4}>
                {offer.offerApplications.map((application) => (
                  <OneOfferApplication
                    key={application.id}
                    application={application}
                  />
                ))}
              </Grid>
            </>
          )}
        </Box>
        <Flex w={"100%"} my={10}>
          <DeleteButton onDelete={handleDeleteOffer} type={"la oferta"}>
            {loadingDel ? "Borrando..." : "Eliminar oferta"}
          </DeleteButton>
        </Flex>
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            {!selectedItemIndie && (
              <BeCurious
                text={
                  "Selecciona alguna solicitud o característica de esta oferta"
                }
              />
            )}
            {selectedItemIndie && selectedItemIndie === "Legal" && (
              <LegalSide
                id={id}
                salary={formattedSalary(offer.offerData.salary) + "€"}
                extraSalary={formattedSalary(offer.offerData.extraSalary) + "€"}
                extras={offer.offerData.extras}
              />
            )}
            {selectedItemIndie && selectedItemIndie === "Horario" && (
              <ScheduleSide schedules={offer.offerData.schedule} />
            )}
            {selectedItemIndie && selectedItemIndie === "Equipo" && (
              <TeamSide
                id={offer.id}
                type={"offer"}
                totalMembers={offer.offerData.already_assigned}
              />
            )}
            {selectedItemIndie && selectedItemIndie.id && (
              <ApplicationSide
                data={{ ...selectedItemIndie, offerName: offer.offerData.name }}
              />
            )}
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </SelectedItemIndie.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {
  deleteProjectOffer,
  deleteProject
};

export default connect(mapStateToProps, mapDispatchToProps)(OneOffer);
