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

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const { values, submitForm, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, "Demasiado corta, al menos 6 caracteres")
        .max(50, "Demasiado largo!")
        .required("Campo obligatorio"),
      email: Yup.string()
        .email("Correo invalido")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        history.push("/");
      } catch (error) {
        console.log(error);
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
            onClose={() => setError(null)}
            mb={4}
          />
        )}
        <Box mb={3}>
          <CustomInput
            mt={1}
            title={"Email"}
            placeholder={"Correo electr??nico"}
            onChange={handleChange("email")}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text pl={3} mt={1} color={"red.full"}>
              {errors.email}
            </Text>
          )}
        </Box>
        <Box mb={4}>
          <CustomInput
            mt={1}
            title={"Contrase??a"}
            type={"password"}
            placeholder={"Contrase??a"}
            onChange={handleChange("password")}
            value={values.password}
          />
          {errors.password && touched.password && (
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
          {loading ? "Accediendo..." : "Acceder"}
        </Flex>
        <Link
          mt={4}
          fontSize={14}
          w={"100%"}
          textAlign={"center"}
          color={"primary"}
          onClick={() => history.push("/reset-password")}
        >
          Recuperar contrase??a
        </Link>
      </Flex>
      <Text
        mt={3}
        fontSize={14}
        w={"100%"}
        textAlign={"center"}
      >
        ??Tienes alguna duda? <Link color={"primary"} ml={1} href="https://www.labora.app/">Ir a la web</Link>
      </Text>
    </Flex>
  );
};

export default Login;
