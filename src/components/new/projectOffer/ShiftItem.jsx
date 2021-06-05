import React, { useContext, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";

// Context
import { NewProjectOfferContext } from "../../../context/newCreations";

// Lib
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

// CSS
import "../../../assets/css/calendar.css";
import "../../../assets/css/timepicker.css";

// Components
import Separator from "../../ui/Separator";

const ShiftItem = ({ index, shift, day }) => {
  const { dispatch } = useContext(NewProjectOfferContext);
  const [start, setStart] = useState(shift.start._seconds * 1000);
  const [end, setEnd] = useState(shift.end._seconds * 1000);

  return (
    <>
      {index !== 0 && <Separator top={3} />}
      <Flex alignItems={"center"} mt={3} borderRadius={10}>
        <Flex
          flex={5}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          w={"100%"}
        >
          <Flex
            maxW={"320px"}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Text mr={2} flex={1} color={"grey.dark"}>
              de
            </Text>
            <DatePicker
              className={"red bg-dark"}
              value={start}
              disableDayPicker
              format={"HH:mm A"}
              plugins={[<TimePicker hideSeconds />]}
              locale={"es"}
              onChange={(d) => {
                setStart(d);
                dispatch({
                  type: "setShift",
                  payload: {
                    day: day,
                    index: index,
                    type: "start",
                    shift: new Date(d).getTime(),
                  },
                });
              }}
            />
          </Flex>
          <Flex
            maxW={"320px"}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text mr={2} flex={1} color={"grey.dark"}>
              a
            </Text>
            <DatePicker
              className={"red bg-dark"}
              value={end}
              disableDayPicker
              format={"HH:mm A"}
              plugins={[<TimePicker hideSeconds />]}
              locale={"es"}
              onChange={(d) => {
                setEnd(d);
                dispatch({
                  type: "setShift",
                  payload: {
                    day: day,
                    index: index,
                    type: "end",
                    shift: new Date(d).getTime(),
                  },
                });
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ShiftItem;