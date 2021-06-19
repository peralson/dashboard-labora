// React
import React, { useState, useEffect } from 'react';
import { Flex, Image, Text, Box } from '@chakra-ui/react';

// Assets
import Logo from '../assets/img/Logo.png';

// Libs
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { newWorker } from '../store/actions/workers';

// Components
import TopMain from '../components/main/TopMain';
import CustomInput from '../components/new/CustomInput';

const NewWorker = ({ match }) => {
  const { id } = match.params
  
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false)
    setError(null)
    console.log(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, 'Demasiado corto, debe tener al menos 5 caracteres')
        .required('Este campo es obligatorio'),
      password: Yup.string()
        .min(6, 'Contraseña demasiado corta, al menos 6 caracteres')
        .max(50, 'Contraseña demasiado larga')
        .required('La contraseña es obligatoria'),
      email: Yup.string()
        .email('Introcude un correo válido')
        .required('El correo es obligatorio'),
    }),
    onSubmit: (values) => {
      setFormLoading(true);
      newWorker({
        name: values.name,
        password: values.password,
        email: values.email,
      })
      .then(() => setSuccess(true))
      .catch(() => setError(true))
      .finally(() => setFormLoading(false))
    },
  });

  return (
    <>
      <TopMain pb={4}>
        <Image src={Logo} alt="Logo de Labora" w="120px" mx={"auto"} />
      </TopMain>
      <Box maxW={"480px"} w={"100%"} mx={"auto"} mt={6} px={4}>
        {loading && <Text>Cargando proyecto...</Text>}
        {error && <Text>Ha ocurrido un error</Text>}
        {!loading && !error && (
          <>
            {success ? (
              <Box bg={"accentLight"} py={2} px={3} borderRadius={8} mb={4}>
                <Text color={"accent"}>
                  ¡Estupendo! Ya formas parte de la lista de Camareros en The First Company.
                </Text>
              </Box>
            ) : (
              <>
                <Text color={"primary"}>
                  The First Company
                </Text>
                <Text fontWeight={"bold"} fontSize={21}>
                  Nuevo Trabajador
                </Text>
                <Text mt={1} mb={4} color={"grey.dark"}>
                  Te han invitado a una lista de Camareros.
                </Text>
                <Box mb={2}>
                  <CustomInput
                    title={'Nombre completo'}
                    placeholder={'José García Pérez'}
                    onChange={formik.handleChange('name')}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <Text mt={1} px={2} color={'red.full'} fontSize={14}>{formik.errors.name}</Text>
                  ) : null}
                </Box>
                <Box mb={2}>
                  <CustomInput
                    title={'Email'}
                    placeholder={'j.garciaperez@gmail.com'}
                    onChange={formik.handleChange('email')}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <Text mt={1} px={2} color={'red.full'} fontSize={14}>{formik.errors.email}</Text>
                  ) : null}
                </Box>
                <Box mb={2}>
                  <CustomInput
                    title={'Contraseña'}
                    type={"password"}
                    placeholder={'Contraseña'}
                    onChange={formik.handleChange('password')}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <Text mt={1} px={2} color={'red.full'} fontSize={14}>{formik.errors.password}</Text>
                  ) : null}
                </Box>
                <Flex
                  _hover={{ cursor: 'pointer' }}
                  bg={'accent'}
                  borderRadius={8}
                  fontWeight='bold'
                  fontSize={16}
                  mt={6}
                  alignItems={'center'}
                  justifyContent='center'
                  px={4}
                  py={2}
                  onClick={formik.submitForm}
                >
                  {formLoading ? 'Cargando...' : 'Registrarse'}
                </Flex>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default NewWorker;
