import React from "react";
import { Flex, Grid } from "@chakra-ui/react";

// Components
import CustomInput from "../CustomInput";
import SideTitle from "../../ui/SideTitle"

const WorkerPersonalForm = ({ handleProcess, formik }) => {
	return (
		<Flex flexDirection="column">
      <SideTitle>Información personal</SideTitle>
			<Grid
				w={"100%"}
				mx={"auto"}
				rowGap={4}
				my={4}
				templateColumns={"1fr 1fr"}
				columnGap={4}
			>
				<CustomInput
					title={"Fecha de Nacimiento"}
					placeholder={"Fecha de nacimiento"}
					onChange={formik.handleChange("birthday")}
					value={formik.values.birthday}
				/>

				<CustomInput
					title={"Género"}
					placeholder={"Género"}
					onChange={formik.handleChange("gender")}
					value={formik.values.gender}
				/>
				<CustomInput
					title={"Descripción"}
					placeholder={"Descripción"}
					onChange={formik.handleChange("bio")}
					value={formik.values.bio}
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
					onClick={() => handleProcess(2)}
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
					onClick={() => handleProcess(4)}
				>
					Siguiente
				</Flex>
			</Flex>
		</Flex>
	);
};

export default WorkerPersonalForm;
