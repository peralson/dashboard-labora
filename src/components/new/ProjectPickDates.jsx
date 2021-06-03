import React, { useState, useContext } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { NewProjectContext } from "../../context/newCreations";
import { Calendar } from "react-multi-date-picker";
import "../../assets/css/calendar.css";

const ProjectPickDates = () => {
  const [values, setValues] = useState([null, null])
  const { dispatch } = useContext(NewProjectContext);

  const handleChangleDate = (d) => {
    setValues(d);
    if (d.length === 0) {
      dispatch({ type: "setDates", payload: [] })
    } else {
      const datesInMs = d.map(({ year, month, day }) => new Date(`${year} ${month.number} ${day}`).getTime())
      dispatch({ type: "setDates", payload: datesInMs })
    }
  }

  return (
    <Flex w={"100%"} mb={6} flexDirection={"column"}>
      <Text mb={1} fontWeight={"bold"}>
        Fecha(s) del proyecto
      </Text>
      <Text mb={4} fontSize={14} color={"grey.dark"}>
        Selecciona los días en los cuales transcurrirá el proyecto.
      </Text>
      <Calendar
        value={values}
        minDate={new Date()}
        multiple
        weekDays={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]} 
        months={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]}
        weekStartDayIndex={0}
        className={"red bg-dark"}
        locale={"es"}
        onChange={handleChangleDate}
      />
    </Flex>
  );
};

export default ProjectPickDates;
