import React from "react";
import { Flex, Text } from "@chakra-ui/react";

// Components
import Separator from "../../ui/Separator";
import ImagePicker from "../../new/ImagePicker";
import SelectList from "../../ui/SelectList";
import { Calendar } from "react-multi-date-picker";
import "../../../assets/css/calendar.css";

const WorkerPersonalForm = ({ handleProcess, formik }) => {
	const isValid =
		formik.values.birthday && formik.values.images.main && formik.values.gender;

	const handleCalendarValue = (d) => {
		const { year, month, day } = d;
		formik.setFieldValue(
			"birthday",
			new Date(`${year} ${month.number} ${day}`).getTime()
		);
	};

	return (
		<Flex flexDirection="column" w="400px">
			<Text fontWeight={"bold"} lineHeight={2} mb={2}>
				Información Personal
			</Text>
			<Separator bottom={4} />
			<Text fontWeight={"bold"} lineHeight={2} mb={2}>
				Fecha de nacimiento
			</Text>
			<Calendar
				value={formik.values.birthday}
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
			<Text fontWeight={"bold"} lineHeight={2} my={2}>
				Género
			</Text>
			<SelectList
				borderWidth={2}
				borderColor={"darkLight"}
				placeholder={"Selecciona género"}
				onChange={formik.handleChange("gender")}
				values={["Hombre", "Mujer"]}
				mb={4}
			/>
			<ImagePicker
				title={"Imagen personal"}
				optional
				onChange={formik.handleChange("images.main")}
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
					onClick={() => handleProcess(2)}
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
					onClick={() => isValid ? handleProcess(4) : {}}
				>
					Siguiente
				</Flex>
			</Flex>
		</Flex>
	);
};

export default WorkerPersonalForm;
