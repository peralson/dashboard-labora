import React from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

// Components
import TextInfo from "../../ui/TextInfo";
import CustomInput from "../CustomInput";
import SideTitle from "../../ui/SideTitle";
import DirectionPicker from "./DirectionPicker";

// ENV & GMaps
import { GMAPS_LIBRARIES } from "../../../lib/Constants";
import { useLoadScript } from "@react-google-maps/api";

const WorkerContactForm = ({ name, email, handleProcess, formik }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		libraries: GMAPS_LIBRARIES,
	});

	return (
		<Flex flexDirection="column" w='800px'>
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
				{!isLoaded ? (
					<Text>Cargando...</Text>
				) : loadError ? (
					<Text>Ha ocurrido un error</Text>
				) : (
					<DirectionPicker
						title={"Dirección"}
						onChangeAddress={formik.handleChange("contact.location.address")}
						onChangeLat={formik.handleChange("contact.location.lat")}
						onChangeLng={formik.handleChange("contact.location.lng")}
						placeholder={formik.values.contact.location.address}
					/>
				)}
			</Grid>
			<Flex flexDirection="row" justifyContent="flex-end">
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
