import React from "react";
import { Flex, Grid } from "@chakra-ui/react";

// Components
import CustomInput from "../CustomInput";
import SideTitle from "../../ui/SideTitle"

const WorkerImagesForm = ({ handleProcess, formik, loading }) => {
	return (
		<Flex flexDirection="column">
      <SideTitle>Imágenes de perfil</SideTitle>
			<Grid
				w={"100%"}
				mx={"auto"}
				rowGap={4}
				my={4}
				templateColumns={"1fr 1fr"}
				columnGap={4}
			>
				<CustomInput
					title={"Imagen personal"}
					placeholder={"Imagen personal"}
					onChange={formik.handleChange("images.main")}
					value={formik.values.images.main}
				/>
				<CustomInput
					title={"Imagen profesional"}
					placeholder={"Imagen profesional"}
					onChange={formik.handleChange("images.profesional")}
					value={formik.values.images.profesional}
				/>
			</Grid>
			<Flex flexDirection="row" justifyContent="space-between">
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
					onClick={() => handleProcess(3)}
				>
					Volver
				</Flex>
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
					{loading ? 'Cargando...' : 'Finalizar'}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default WorkerImagesForm;
