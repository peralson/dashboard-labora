import React, { useState } from "react";
import { Flex, Text, Grid } from "@chakra-ui/react";

// Libs
import { useFormik } from "formik";
import * as Yup from "yup";

// Redux
import { connect } from "react-redux";
import { newWorker } from "../../../store/actions/workers";

import CustomInput from "../CustomInput";

const RegisterForm = ({
	handleProcess,
	handleUid,
	handleName,
	handleEmail,
  newWorker
}) => {
  const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.min(3, "Demasiado corto, debe tener al menos 3 caracteres")
				.max(50, "Demasiado largo!")
				.required("Campo obligatorio"),
			password: Yup.string()
				.min(6, "Demasiado corta, debe tener al menos 6 caracteres")
				.max(50, "Demasiado largo!")
				.required("Campo obligatorio"),
			email: Yup.string()
				.email("Correo invalido")
				.required("Campo obligatorio"),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			try {
				const id = await newWorker({
					name: values.name,
					password: values.password,
					email: values.email,
				});
				if (id) {
					handleUid(id);
          handleEmail(values.email)
          handleName(values.name)
					handleProcess(2);
				}
			} catch (err) {
				console.log("error:", err);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<Grid w={"100%"} mx={"auto"} rowGap={4} my={4}>
			<CustomInput
				title={"Nombre"}
				placeholder={"Nombre completo"}
				onChange={formik.handleChange("name")}
				value={formik.values.name}
			/>
			{formik.errors.name && formik.touched.name ? (
				<Text color="red" fontSize={14}>
					{formik.errors.name}
				</Text>
			) : null}
			<CustomInput
				title={"Email"}
				placeholder={"Correo electrónico"}
				onChange={formik.handleChange("email")}
				value={formik.values.email}
			/>
			{formik.errors.email && formik.touched.email ? (
				<Text color="red" fontSize={14}>
					{formik.errors.email}
				</Text>
			) : null}
			<CustomInput
				title={"Contraseña"}
				placeholder={"Contraseña"}
				onChange={formik.handleChange("password")}
				value={formik.values.password}
				type="password"
			/>
			{formik.errors.password && formik.touched.password ? (
				<Text color="red" fontSize={14}>
					{formik.errors.password}
				</Text>
			) : null}
			<Flex
				_hover={{ cursor: "pointer" }}
				bg={"accent"}
				borderRadius={8}
				fontWeight="bold"
				fontSize={16}
				mt={4}
				alignItems={"center"}
				justifyContent="center"
				px={4}
				py={2}
				onClick={formik.submitForm}
			>
				{loading ? "Cargando..." : "Registrarse"}
			</Flex>
		</Grid>
	);
};

const mapDispatchToProps = {
	newWorker,
};

export default connect(null, mapDispatchToProps)(RegisterForm);
