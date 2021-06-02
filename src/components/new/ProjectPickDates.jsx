import React, { useState, useContext } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { NewProjectContext } from "../../context/newCreations";
import Calendar from "react-calendar";
import "../../assets/css/calendar.css";

const ProjectPickDates = () => {
  const [date, setDate] = useState(null);
  const [isRange, setIsRange] = useState(false);
  const { dispatch } = useContext(NewProjectContext);
  return (
    <Flex w={"100%"} mb={6} flexDirection={"column"}>
      <Flex mb={1} alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"}>
          {isRange ? "Fechas del proyecto" : "Fecha del proyecto"}
        </Text>
        <Text
          fontSize={14}
          color={"primary"}
          py={1}
          px={2}
          borderRadius={10}
          cursor={"pointer"}
          borderWidth={1}
          borderColor={"primary"}
          onClick={() => {
            setDate(null);
            setIsRange(!isRange);
            dispatch({ type: "setDates", payload: [] });
          }}
        >
          {isRange ? "Seleccionar un día" : "Seleccionar varios días"}
        </Text>
      </Flex>
      <Text mb={4} fontSize={14} color={"grey.dark"}>
        {isRange
          ? "Selecciona los días en los cuales transcurrirá el proyecto"
          : "Selecciona el día en el cual transcurrirá el proyecto"}
      </Text>
      <Calendar
        value={date}
        minDate={new Date()}
        onChange={(d) => {
          setDate(d);
          dispatch({ type: "setDates", payload: isRange ? d : [d] });
        }}
        locale={"es-ES"}
        selectRange={isRange}
      />
    </Flex>
  );
};

export default ProjectPickDates;
