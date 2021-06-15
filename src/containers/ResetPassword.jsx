// React
import React, { useState } from "react";
import { Box, Flex, Image, Text, Link } from "@chakra-ui/react";

// Custom
import { useAuth } from "../context/AuthContext";

// Assets
import Logo from "../assets/img/Logo.png";

// Libs
import { useFormik } from "formik";
import * as Yup from "yup";

// Components
import CustomInput from "../components/new/CustomInput";
import ErrorMessage from "../components/ui/ErrorMessage";

const ResetPassword = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { resetPassword } = useAuth();

  const { values, submitForm, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Correo invalido")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await resetPassword(values.email);
        setSuccess(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      w={"100vw"}
      h={"100vh"}
      mx={"auto"}
      bg={"darkLight"}
    >
      <Flex
        maxW={"480px"}
        w={"100%"}
        p={6}
        pt={10}
        flexDirection={"column"}
        borderRadius={20}
        borderWidth={2}
        borderColor={"translucid"}
        bg={"dark"}
      >
        <Box mb={10} mx={"auto"}>
          <Image src={Logo} alt="Logo de Labora" w="160px" />
        </Box>
        {error && (
          <ErrorMessage
            title={"Oh! Vaya... Ha ocurrido un error"}
            secondary={error}
            noMargin
            mb={4}
            onClose={() => setError(null)}
          />
        )}
        {success && (
          <Text
            bg={"accentLight"}
            color={"accent"}
            py={2}
            px={3}
            borderRadius={10}
            mb={4}
          >
            ¡Ya lo tienes! Te hemos enviado un correo con el que podrás cambiar
            tu contraseña.
          </Text>
        )}
        <Box mb={2}>
          <CustomInput
            mt={1}
            title={"Email"}
            placeholder={"Correo electrónico"}
            onChange={handleChange("email")}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text pl={3} mt={1} color={"red.full"}>
              {errors.email}
            </Text>
          )}
        </Box>
        <Flex
          _hover={{ cursor: "pointer" }}
          bg={"accent"}
          borderRadius={8}
          fontWeight="bold"
          mt={6}
          alignItems={"center"}
          justifyContent="center"
          py={2}
          onClick={submitForm}
        >
          {loading ? "Cargando..." : "Enviar link"}
        </Flex>
        <Link
          mt={4}
          fontSize={14}
          w={"100%"}
          textAlign={"center"}
          color={"primary"}
          onClick={() => history.push("/login")}
        >
          Ir al login
        </Link>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
