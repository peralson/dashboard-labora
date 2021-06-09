import React, { useState } from 'react';
import { Flex, Text, Grid } from '@chakra-ui/layout';

// Form
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
import NewTopHeaderBar from '../../components/new/NewTopHeaderBar';
import TopButton from '../../components/ui/TopButton';
import ErrorMessage from '../../components/ui/ErrorMessage';
import CustomInput from '../../components/new/CustomInput';

const ErrorText = ({ error }) => (
  <Text color='red.full' fontSize={14} px={1} mt={1}>
    {error}
  </Text>
);

const EditOffer = ({ editOffer, match, history, projects }) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItemIndie, setSelectedItemIndie] = useState(null);

  const project = projects.find((p) =>
    p.projectOffers.some((offer) => offer.id === id)
  );

  const offer = project.projectOffers.find((offer) => offer.id === id);

  const formik = useFormik({
    initialValues: {
      name: offer.offerData.name,
      salary: offer.offerData.salary,
      extra: offer.offerData.extraSalary,
      qty: offer.offerData.qty,
      description: offer.offerData.description,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Demasiado corto")
        .max(50, "Demasiado largo!")
        .required("Campo obligatorio"),
      salary: Yup.number()
        .min(offer.offerData.salary, "No se puede reducir el salario!")
        .required("Campo obligatorio"),
      extra: Yup.number()
        .min(offer.offerData.extraSalary, "No se puede reducir el salario!")
        .required("Campo obligatorio"),
      qty: Yup.number()
        .min(offer.offerData.already_assigned, "Ya hay trabajadores aceptados!")
        .min(1, "Al menos un trabajador")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null)
      try {
        await editOffer({
          projectData: { id: project.id },
          offerData: {
            id: offer.id,
            name: values.name,
            salary: values.salary,
            extra: values.extra,
            qty: values.qty,
            description: values.description,
          },
        });
        history.push(`../../`);
      } catch (err) {
        setError(true);
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
              <TopButton right icon={edit} inactive={!formik.isValid} onSelect={formik.submitForm}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </TopButton>
            }
          >
            Editar oferta
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          {error && (
            <ErrorMessage
              title="Oh! Vaya... algo salió mal"
              secondary="Ha habido un problema editando la oferta. Inténtalo más tarde."
              onClose={() => setError(null)}
            />
          )}
          <Grid gap={4} width={'100%'} templateColumns={'1fr 1fr'}>
            <Flex flexDirection='column'>
              <CustomInput
                title='Nombre'
                value={formik.values.name}
                optional
                onChange={formik.handleChange('name')}
              />
              {formik.errors.name && formik.touched.name ? (
                <ErrorText error={formik.errors.name} />
              ) : null}
            </Flex>
            <Flex flexDirection='column'>
              <CustomInput
                title='Salario'
                value={formik.values.salary}
                optional
                onChange={formik.handleChange('salary')}
              />
              {formik.errors.salary && formik.touched.salary ? (
                <ErrorText error={formik.errors.salary} />
              ) : null}
            </Flex>
            <Flex flexDirection='column'>
              <CustomInput
                title='Horas extra'
                optional
                value={formik.values.extra}
                onChange={formik.handleChange('extra')}
              />
              {formik.errors.extra && formik.touched.extra ? (
                <ErrorText error={formik.errors.extra} />
              ) : null}
            </Flex>
            <Flex flexDirection='column'>
              <CustomInput
                optional
                title='Cantidad'
                value={formik.values.qty}
                onChange={formik.handleChange('qty')}
              />
              {formik.errors.qty && formik.touched.qty ? (
                <ErrorText error={formik.errors.qty} />
              ) : null}
            </Flex>
          </Grid>
          <CustomInput
            multiline
            optional
            title='Requisitos'
            value={formik.values.description}
            onChange={formik.handleChange('description')}
          />
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
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
  editOffer,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOffer);
