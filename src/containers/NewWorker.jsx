// React
import React, { useState } from 'react';
import { Grid, Box, Flex, Image, Text } from '@chakra-ui/react';

// Assets
import Logo from '../assets/img/Logo.png';

// Libs
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { newWorker } from '../store/actions/workers';

// Components
import CustomInput from '../components/new/CustomInput';
import ErrorMessage from '../components/ui/ErrorMessage';

const NewWorker = () => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, 'Demasiado corto, al menos 3 caracteres')
        .max(50, 'Demasiado largo!')
        .required('Campo obligatorio'),
      password: Yup.string()
        .min(6, 'Demasiado corta, al menos 6 caracteres')
        .max(50, 'Demasiado largo!')
        .required('Campo obligatorio'),
      email: Yup.string()
        .email('Correo invalido')
        .required('Campo obligatorio'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await newWorker({
          name: values.name,
          password: values.password,
          email: values.email,
        });
      } catch (err) {
        console.log('error:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Flex
      display='flex'
      justifyContent='center'
      width={'100vw'}
      px={6}
      mx={'auto'}
    >
      <Flex
        maxW='1400px'
        w='100%'
        p={8}
        flexDirection='column'
        alignItems='center'
      >
        <Box mb='8'>
          <Image src={Logo} alt='Logo de Labora' w='120px' />
        </Box>
        <Text>Has sido invitado por la empresa Clapfy como camarero</Text>
        <Grid w={'100%'} maxW={'400px'} mx={'auto'} rowGap={4} my={4}>
          <CustomInput
            title={'Nombre'}
            placeholder={'Nombre completo'}
            onChange={formik.handleChange('name')}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <ErrorMessage title={formik.errors.name} />
          ) : null}
          <CustomInput
            title={'Email'}
            placeholder={'Correo electrónico'}
            onChange={formik.handleChange('email')}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <ErrorMessage title={formik.errors.email} />
          ) : null}
          <CustomInput
            title={'Contraseña'}
            placeholder={'Contraseña'}
            onChange={formik.handleChange('password')}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <ErrorMessage title={formik.errors.password} />
          ) : null}
          <Flex
            _hover={{ cursor: 'pointer' }}
            bg={'accent'}
            borderRadius={8}
            fontWeight='bold'
            fontSize={16}
            mt={4}
            alignItems={'center'}
            justifyContent='center'
            px={4}
            py={2}
            onClick={formik.submitForm}
          >
            Registrarse
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default NewWorker;
