import React from "react";
import { Flex, Grid } from "@chakra-ui/react";

// Components
import TextInfo from "../../ui/TextInfo";
import CustomInput from "../CustomInput";
import SideTitle from "../../ui/SideTitle"

const WorkerContactForm = ({
	name,
	email,
	handleProcess,
	formik,
}) => {
	return (
		<Flex flexDirection="column">
      <SideTitle>Información de contacto</SideTitle>
			<Grid
				w={"100%"}
				mx={"auto"}
				rowGap={4}
				my={4}
				templateColumns={"1fr 1fr"}
				columnGap={4}
			>
				<TextInfo title="Nombre" info={name} />
				<TextInfo title="Email" info={email} />
        <CustomInput
					title={"Teléfono"}
					placeholder={"Teléfono"}
					onChange={formik.handleChange("contact.phoneNumber")}
					value={formik.values.contact.phoneNumber}
				/>
				<CustomInput
					title={"Dirección"}
					placeholder={"Dirección"}
					onChange={formik.handleChange("contact.location.address")}
					value={formik.values.contact.location.address}
				/>
			</Grid>
			<Flex flexDirection="row" justifyContent='flex-end'>
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
					Siguiente
				</Flex>
			</Flex>
		</Flex>
	);
};

export default WorkerContactForm;
