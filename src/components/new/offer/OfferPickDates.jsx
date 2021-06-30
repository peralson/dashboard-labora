import React, { useState, useContext, useEffect } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { NewOfferContext } from "../../../context/newCreations";
import { Calendar } from "react-multi-date-picker";
import "../../../assets/css/calendar.css";

const OfferPickDates = () => {
  const [values, setValues] = useState([null, null]);
  const { state, dispatch } = useContext(NewOfferContext);
  
  useEffect(() => {
    if (state.projectData.dates.length > 0) {
      dispatch({ type: "setDates", payload: [] });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangleDate = (d) => {
    setValues(d);
    if (d.length === 0) {
      dispatch({ type: "setDates", payload: [] });
    } else {
      const datesInMs = d.map(({ year, month, day }) =>
        new Date(`${year} ${month.number} ${day}`).getTime(),
      );
      dispatch({ type: "setDates", payload: datesInMs });
    }
  };

  return (
    <Flex w={"100%"} mb={6} flexDirection={"column"}>
      <Text mb={1} fontWeight={"bold"}>
        Fecha(s) de la oferta
      </Text>
      <Text mb={4} fontSize={14} color={"grey.dark"}>
        Selecciona los días en los cuales transcurrirá la oferta.
      </Text>
      <Calendar
        value={values}
        minDate={new Date()}
        multiple
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
        onChange={handleChangleDate}
      />
    </Flex>
  );
};

export default OfferPickDates;
