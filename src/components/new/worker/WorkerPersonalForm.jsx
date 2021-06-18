import React from "react";
import { Flex, Text, Grid } from "@chakra-ui/react";

// Components
import CustomInput from "../CustomInput";
import SideTitle from "../../ui/SideTitle";
import SelectList from "../../ui/SelectList";
import { Calendar } from "react-multi-date-picker";
import "../../../assets/css/calendar.css";

const WorkerPersonalForm = ({ handleProcess, formik }) => {
	const handleCalendarValue = (d) => {
		const { year, month, day } = d;
		formik.setFieldValue(
			"birthday",
			new Date(`${year} ${month.number} ${day}`).getTime()
		);
	};

	return (
		<Flex flexDirection="column" w="800px">
			<SideTitle>Información personal</SideTitle>
			<Grid
				w={"100%"}
				mx={"auto"}
				rowGap={4}
				my={4}
				templateColumns={"1fr 1fr"}
				columnGap={4}
			>
				<Flex flexDirection="column">
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
				</Flex>
				<Flex flexDirection="column">
					<Text fontWeight={"bold"} lineHeight={2} mb={2}>
						Género
					</Text>
					<SelectList
						borderWidth={2}
						borderColor={"darkLight"}
						placeholder={formik.values.gender}
						onChange={formik.handleChange("gender")}
						values={["Hombre", "Mujer"]}
						mb={4}
					/>
					<CustomInput
						multiline
						title={"Descripción"}
						placeholder={"Descripción"}
						onChange={formik.handleChange("bio")}
						value={formik.values.bio}
					/>
				</Flex>
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
