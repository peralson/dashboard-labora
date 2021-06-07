import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

// Context
import { NewOfferContext } from "../../../context/newCreations";

// SVG
import plus from "../../../assets/svg/plus.svg";
import remove from "../../../assets/svg/cancel.svg";

// Components
import OfferShiftItem from "./OfferShiftItem";

const OfferShiftsPicker = ({ date }) => {
  const { state, dispatch } = useContext(NewOfferContext);
  const pickedDate = state.offerData.schedule.find((sche) => sche.day === date);
  const pickedDateIndex = state.offerData.schedule.findIndex(
    (sche) => sche.day === date,
  );
  const totalShifts = pickedDate.shifts.length;
  return (
    <Box mt={6}>
      {pickedDate.shifts.map((shift, index) => (
        <OfferShiftItem
          key={index}
          index={index}
          day={pickedDate}
          shift={shift}
          totalShifts={totalShifts}
        />
      ))}
      <Flex mt={6} w={"100%"}>
        {totalShifts !== 1 && (
          <Flex
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            py={2}
            borderRadius={10}
            cursor={"pointer"}
            _hover={{ bg: "red.smooth" }}
            onClick={() =>
              dispatch({ type: "removeShift", index: pickedDateIndex })
            }
          >
            <Image src={remove} alt={"Eliminar turno"} w={"10px"} />
            <Text fontSize={14} ml={2} color={"red.full"} lineHeight={1}>
              Borrar turno
            </Text>
          </Flex>
        )}
        <Flex
          flex={1}
          alignItems={"center"}
          justifyContent={"center"}
          py={2}
          borderRadius={10}
          cursor={"pointer"}
          _hover={{ bg: "translucid" }}
          onClick={() => dispatch({ type: "addShift", date: date })}
        >
          <Image src={plus} alt={"Agregar turno"} w={"12px"} />
          <Text fontSize={14} ml={2} color={"primary"} lineHeight={1}>
            Añadir turno
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OfferShiftsPicker;
