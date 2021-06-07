import React, { useState } from 'react';
import { Flex, Box, Text, Grid } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

// Custom
import { connect } from 'react-redux';
// Context
import { SelectedItemIndie } from '../../context/SelectedItemContext';

// Actions
import { editOffer } from '../../store/actions/projects';

// SVG
import back from '../../assets/svg/back.svg';
import edit from '../../assets/svg/edit.svg';

// Components
import Main from '../../components/main/Main';
import TopMain from '../../components/main/TopMain';
import Side from '../../components/main/Side';
import SideSticky from '../../components/main/SideSticky';
import SideBoxContainer from '../../components/ui/SideBoxContainer';
import Documentation from '../../components/main/Documentation';
import BeCurious from '../../components/ui/BeCurious';
import NewTopHeaderBar from '../../components/new/NewTopHeaderBar';
import TopButton from '../../components/ui/TopButton';
import CustomInput from '../../components/new/CustomInput';

const EditOffer = ({ match, history, projects }) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  const project = projects.find((p) =>
    p.projectOffers.some((offer) => offer.id === id)
  );

  const offer = project.projectOffers.find((offer) => offer.id === id);

  const formik = useFormik({
    initialValues: {
      projectId: project.id,
      offerId: offer.id,
      name: offer.offerData.name,
      category: offer.offerData.category,
      salary: offer.offerData.salary,
      extra: offer.offerData.extraSalary,
      qty: offer.offerData.qty,
      description: offer.offerData.description,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await editOffer(
          values.projectId,
          values.offerId,
          values.name,
          values.category,
          values.salary,
          values.extra,
          values.qty,
          values.description
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <SelectedItemIndie.Provider
      value={{ selectedItemIndie, setSelectedItemIndie }}
    >
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <TopButton
                left
                icon={back}
                onSelect={() => history.push(`../../`)}
              >
                Volver
              </TopButton>
            }
            rightButton={
              <TopButton right icon={edit} onSelect={formik.submitForm}>
                {isLoading ? "Guardando..." : "Guardar"}
              </TopButton>
            }
          >
            Editar oferta
          </NewTopHeaderBar>
        </TopMain>
        <Box pb={10}>
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
          <Grid columnGap={8} width={"100%"} templateColumns={"1r 1fr"} my={4}>
            <Box>
              <Grid gap={4} width={"100%"} templateColumns={"1fr 1fr"} mb={4}>
                <CustomInput
                  title="Nombre"
                  value={formik.values.name}
                  optional
                  onChange={formik.handleChange("name")}
                />
                <CustomInput
                  title="Categoría"
                  value={formik.values.category}
                  optional
                  onChange={formik.handleChange("category")}
                />
                <CustomInput
                  title="Salario"
                  value={formik.values.salary}
                  optional
                  onChange={formik.handleChange("salary")}
                />
                <CustomInput
                  title="Horas extra"
                  optional
                  value={formik.values.extra}
                  onChange={formik.handleChange("extra")}
                />
                <CustomInput
                  optional
                  title="Cantidad"
                  value={formik.values.qty}
                  onChange={formik.handleChange("qty")}
                />
              </Grid>
              <CustomInput
                multiline
                optional
                title="Requisitos"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
              />
            </Box>
          </Grid>
        </Box>
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            <BeCurious text={"Edita las características de tu oferta"} />
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditOffer);
