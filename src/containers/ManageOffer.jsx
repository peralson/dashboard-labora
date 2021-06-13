import React, { useState } from 'react';
import { Flex, Box, Text, Grid } from '@chakra-ui/react';

// Custom
import { connect } from 'react-redux';
import { deleteProjectOffer, deleteProject } from '../store/actions/projects';
import { formattedSalary } from '../lib/formattedSalary';

// Context
import { SelectedItemIndie } from '../context/SelectedItemContext';

// SVG
import legal from '../assets/svg/legal.svg';
import schedule from '../assets/svg/schedule.svg';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SideSticky from '../components/main/SideSticky';
import SideBoxContainer from '../components/ui/SideBoxContainer';
import Documentation from '../components/main/Documentation';
import SideSelectorOffer from '../components/ui/SideSelectorOffer';
import OneOfferJob from '../components/ui/OneOfferJob';
import TextInfo from '../components/ui/TextInfo';
import ScheduleSide from '../components/ui/ScheduleSide';
import LegalSide from '../components/ui/LegalSide';
import TopHeaderBar from '../components/ui/TopHeaderBar';
import JobSide from '../components/ui/JobSide';
import BeCurious from '../components/ui/BeCurious';

const ManageOffer = ({
  match,
  history,
  pastProjects,
  deleteProjectOffer,
  deleteProject,
}) => {
  const { id } = match.params;

  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  const project = pastProjects.find(({ projectOffers }) =>
    projectOffers.some((offer) => offer.id === id)
  );

  if (!project) return <Box></Box>;

  const offer = project.projectOffers.find((offer) => offer.id === id);

  console.log('offer', offer);

  if (!offer) return <Box></Box>;

  return (
    <SelectedItemIndie.Provider
      value={{ selectedItemIndie, setSelectedItemIndie }}
    >
      <Main>
        <TopMain>
          <TopHeaderBar onGoBack={() => history.push(`../../gestion`)}>
            Oferta
          </TopHeaderBar>
        </TopMain>
        <Box pb={10}>
          {project.projectData.name && (
            <Flex mt={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <Text fontSize={14} lineHeight={1.5}>
                Esta oferta pertenece al proyecto:
              </Text>
              <Text
                color={'primary'}
                ml={2}
                fontSize={14}
                lineHeight={1.35}
                _hover={{ textDecoration: 'underline' }}
              >
                {project.projectData.name}
              </Text>
            </Flex>
          )}
          <Grid columnGap={8} width={'100%'} templateColumns={'3fr 1fr'} my={4}>
            <Box>
              <Grid gap={4} width={'100%'} templateColumns={'1fr 1fr'} mb={4}>
                <TextInfo title='Nombre' info={offer.offerData.name} />
                <TextInfo title='Categoría' info={offer.offerData.category} />
                <TextInfo
                  title='Salario'
                  info={formattedSalary(offer.offerData.salary) + '€'}
                />
                <TextInfo
                  title='Horas extra'
                  info={formattedSalary(offer.offerData.extraSalary) + '€'}
                />
                <TextInfo title='Cantidad' info={offer.offerData.qty} />
              </Grid>
              <TextInfo
                title='Requerimientos'
                info={offer.offerData.description}
                minH={'120px'}
              />
            </Box>
            <Box>
              <SideSelectorOffer
                mb={4}
                title={'Legal'}
                desc={'Contrato, nóminas...'}
                image={legal}
              />
              <SideSelectorOffer
                mb={3}
                title={'Horario'}
                desc={'Horas totales, turnos...'}
                image={schedule}
              />
            </Box>
          </Grid>
          {offer.offerJobs.length > 0 && (
            <>
              <Text fontSize={19} mb={2} fontWeight={'bold'} lineHeight={2}>
                Equipo
              </Text>
              <Grid
                w={'100%'}
                templateColumns={'1fr 1fr 1fr'}
                columnGap={4}
                rowGap={4}
              >
                {offer.offerJobs.map((job) => (
                  <OneOfferJob key={job.id} job={job} />
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
            {!selectedItemIndie && (
              <BeCurious
                text={
                  'Selecciona alguna solicitud o característica de esta oferta'
                }
              />
            )}
            {selectedItemIndie && selectedItemIndie === 'Legal' && (
              <LegalSide
                id={id}
                salary={formattedSalary(offer.offerData.salary) + '€'}
                extraSalary={formattedSalary(offer.offerData.extraSalary) + '€'}
                extras={offer.offerData.extras}
              />
            )}
            {selectedItemIndie && selectedItemIndie === 'Horario' && (
              <ScheduleSide schedules={offer.offerData.schedule} />
            )}
            {selectedItemIndie && selectedItemIndie.id && (
              <JobSide
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
    pastProjects: state.projects.pastProjects,
  };
};

const mapDispatchToProps = {
  deleteProjectOffer,
  deleteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOffer);
