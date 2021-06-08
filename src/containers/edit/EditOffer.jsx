import React, { useState } from 'react';
import { Flex, Box, Text, Grid } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

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
import Documentation from '../../components/main/Documentation';
import BeCurious from '../../components/ui/BeCurious';
import NewTopHeaderBar from '../../components/new/NewTopHeaderBar';
import TopButton from '../../components/ui/TopButton';
import CustomInput from '../../components/new/CustomInput';

const ErrorText = ({ error }) => {
  return (
    <Text color='red' fontSize={14}>
      {error}
    </Text>
  );
};
const EditOffer = ({ editOffer, match, history, projects }) => {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState(false);
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
        .min(3, 'Demasiado corto')
        .max(50, 'Demasiado largo!')
        .required('Campo obligatorio'),
      salary: Yup.number()
        .min(offer.offerData.salary, 'No se puede reducir el salario!')
        .required('Campo obligatorio'),
      extra: Yup.number()
        .min(offer.offerData.extraSalary, 'No se puede reducir el salario!')
        .required('Campo obligatorio'),
      qty: Yup.number()
        .min(offer.offerData.already_assigned, 'Ya hay trabajadores aceptados!')
        .required('Campo obligatorio'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log('enviando');
      try {
        console.log('entrando');
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
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        history.push(`../../`);
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
                {isLoading ? 'Guardando...' : 'Guardar'}
              </TopButton>
            }
          >
            Editar oferta
          </NewTopHeaderBar>
        </TopMain>
        <Box pb={10}>
          {project.projectData.name && (
            <Flex mt={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <Text fontSize={14} lineHeight={1.5}>
                Esta oferta pertenece al proyecto:
              </Text>
              <Link to={`../../ofertas/p/${project.id}`}>
                <Text
                  color={'primary'}
                  ml={2}
                  fontSize={14}
                  lineHeight={1.35}
                  _hover={{ textDecoration: 'underline' }}
                >
                  {project.projectData.name}
                </Text>
              </Link>
            </Flex>
          )}
          <Grid columnGap={8} width={'100%'} templateColumns={'1r 1fr'} my={4}>
            <Box>
              <Grid gap={4} width={'100%'} templateColumns={'1fr 1fr'} mb={4}>
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
            </Box>
          </Grid>
        </Box>
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          <SideBoxContainer>
            <BeCurious text={'Edita las características de tu oferta'} />
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
