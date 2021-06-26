import React from "react";
import { Flex, Text } from "@chakra-ui/react";

// Components
import CustomInput from "../CustomInput";
import ImagePicker from "../ImagePicker";
import Separator from "../../ui/Separator";
import { Calendar } from "react-multi-date-picker";
import "../../../assets/css/calendar.css";

const WorkerLegalForm = ({ handleProcess, formik, loading }) => {
	const isValid =
  formik.values.legal.dni.number &&
  formik.values.legal.dni.number.length === 9 &&
	formik.values.legal.dni.expiryDate &&
	formik.values.legal.dni.front &&
	formik.values.legal.dni.back;

	const handleCalendarValue = (d) => {
		const { year, month, day } = d;
		formik.setFieldValue(
			"legal.dni.expiryDate",
			new Date(`${year} ${month.number} ${day}`).getTime()
		);
	};
  
	return (
		<Flex flexDirection="column" w="400px">
			<Text fontWeight={"bold"} lineHeight={2} mb={2}>
				Información legal
			</Text>
			<Separator bottom={4} />
			<CustomInput
				title={"Número de DNI"}
				placeholder={"DNI"}
				onChange={formik.handleChange("legal.dni.number")}
				value={formik.values.legal.dni.number}
				mb={4}
			/>
			<Text fontWeight={"bold"} lineHeight={2} mb={2}>
				Fecha de caducidad
			</Text>
			<Calendar
				value={formik.values.legal.dni.expiryDate}
				minDate={new Date(1900, 1, 1)}
				weekDays={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]}
				months={[
					"Enero",
					"Febrero",
					"Marzo",
					"Abril",
					"Mayo",
					"Junio",
					"Julio",
					"Agosto",
					"Septiembre",
					"Octubre",
					"Noviembre",
					"Diciembre",
				]}
				weekStartDayIndex={0}
				className={"red bg-dark"}
				locale={"es"}
				onChange={(d) => handleCalendarValue(d)}
			/>
			<ImagePicker
				title={"Imagen frontal"}
				optional
				onChange={formik.handleChange("legal.dni.front")}
				my={4}
			/>
			<ImagePicker
				title={"Imagen trasera"}
				optional
				onChange={formik.handleChange("legal.dni.back")}
				mb={4}
			/>
			<Flex flexDirection="row" justifyContent="space-between" mt={8}>
				<Flex
					_hover={{ cursor: "pointer" }}
					bg={"accent"}
					borderRadius={8}
					fontWeight="bold"
					fontSize={16}
					alignItems={"center"}
					justifyContent="center"
					px={4}
					py={2}
					onClick={() => handleProcess(3)}
				>
					Volver
				</Flex>
				<Flex
					_hover={{ cursor: isValid && "pointer" }}
					bg={"accent"}
					borderRadius={8}
					fontWeight="bold"
					fontSize={16}
					alignItems={"center"}
					justifyContent="center"
					opacity={!isValid && 0.6}
					px={4}
					py={2}
					onClick={isValid && formik.submitForm}
				>
					{loading ? "Cargando..." : "Finalizar"}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default WorkerLegalForm;
