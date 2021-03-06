import React, { useState } from 'react';
import { Flex, Box, Text, Grid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Custom
import { connect } from 'react-redux';
import { deleteProjectOffer, deleteProject } from '../store/actions/projects'

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
import ScheduleSide from '../components/ui/ScheduleSide';
import LegalSide from '../components/ui/LegalSide';
import TeamSide from "../components/ui/TeamSide";
import TopHeaderBar from '../components/ui/TopHeaderBar';
import ApplicationSide from '../components/ui/ApplicationSide';
import BeCurious from '../components/ui/BeCurious';
import DeleteButton from '../components/ui/DeleteButton';
import ErrorMessage from '../components/ui/ErrorMessage';
import Remaining from '../components/ui/Remaining';
import CostItem from '../components/ui/CostItem';
import CopyLinkBar from '../components/ui/CopyLinkBar';

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
  const extrasLength = offer.offerData.extras.filter(extra => extra.amount > 0).length

  const handleDeleteOffer = () => {
    setErrorDel(null);
    setLoadingDel(true);
    if (!isSingle) {
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

  console.log(offer.offerData);

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
              secondary={"Int??ntalo m??s tarde."}
              onClose={() => setErrorDel(null)}
            />
          )}
          {project.projectData.name && (
            <Flex mt={3} alignItems={"flex-end"} justifyContent={"flex-end"}>
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
          <Flex mt={6} alignItems={"center"} justifyContent={"space-between"}>
            <Flex flexDirection={"column"} alignItems={"flex-start"} flex={1}>
              <Text fontSize={21} fontWeight="bold">
                {offer.offerData.name}
              </Text>
              <Text fontSize={14} color={"primary"}>
                {project.projectData.location.address}
              </Text>
            </Flex>
            <Remaining
              alreadyassigned={offer.offerData.already_assigned}
              qty={offer.offerData.qty}
              success={"Equipo completo"}
              px={4}
              py={2.5}
              fontSize={16}
              borderRadius={20}
            />
          </Flex>
          <Grid mt={6} templateColumns={`repeat(${2 + extrasLength}, 1fr)`} justifyContent={"center"} alignContent={"center"} gap={4}>
            <CostItem name={"Salario hora"} amount={offer.offerData.salary} />
            <CostItem name={"Salario extra"} amount={offer.offerData.extraSalary} />
            {offer.offerData.extras.map(
              (extra, index) => 
                extra.amount > 0 && <CostItem key={index} name={extra.name} amount={extra.amount} />
            )}
          </Grid>
          <Box mt={10}>
            <Text mb={2} fontWeight={"bold"}>
              Enlace de gesti??n
            </Text>
            <Text mb={4} color={"grey.dark"}>
              Abre o comparte el siguiente enlace, desde el se podr?? visualizar y gestionar los trabajadores de esta oferta.
            </Text>
            <CopyLinkBar id={project.id} />
          </Box>
          <Text mt={10} mb={2} fontWeight={"bold"}>
            Sobre esta oferta de {offer.offerData.category.data.name}
          </Text>
          {offer.offerData.description && (
            <Text mb={6} color={"grey.dark"} fontStyle={"italic"}>
              {offer.offerData.description}
            </Text>
          )}
          <Grid mt={4} templateColumns={"1fr 1fr 1fr"} w={"100%"} columnGap={4}>
            <SideSelectorOffer
              title={"Legal"}
              desc={"Sobre el contrato..."}
              image={legal}
            />
            <SideSelectorOffer
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
          </Grid>
          {offer.offerData.tags && offer.offerData.tags.length > 0 && (
            <Flex mt={6} alignItems={"center"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Etiquetas:</Text>
              <Flex alignItems={"center"}>
                {offer.offerData.tags.map((tag, index) => (
                  <Text
                    key={index}
                    ml={2}
                    py={0.5}
                    px={2}
                    fontSize={14}
                    borderWidth={1}
                    borderRadius={8}
                    borderColor={"primaryLight"}
                    color={"primary"}
                  >
                    {tag.data.name}
                  </Text>
                ))}
              </Flex>
            </Flex>
          )}
          {offer.offerApplications.length > 0 && !isComplete && (
            <Box mt={8}>
              <Text mb={3} fontWeight={"bold"}>
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
            </Box>
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
                  "Selecciona alguna solicitud o caracter??stica de esta oferta"
                }
              />
            )}
            {selectedItemIndie && selectedItemIndie === "Legal" && (
              <LegalSide offerId={id} />
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
