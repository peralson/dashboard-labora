import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { NewOfferContext } from "../../../context/newCreations";
import { validateSchedule } from "../../../lib/forms/newOfferState";

// svg
import cancel from "../../../assets/svg/cancel.svg";
import correct from "../../../assets/svg/correct.svg";

// Components
import Separator from "../../ui/Separator";

const OfferScheduleValidation = () => {
  const { state } = useContext(NewOfferContext);
  const { hasSchedule, shiftsLongerThanHour, allConsecutiveShifts } =
    validateSchedule(state);
  return (
    <Box>
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Días
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Selecciona al menos un día
          </Text>
          <Image src={hasSchedule ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
      <Separator top={4} bottom={4} />
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Horario
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Los turnos han de ser consecutivos
          </Text>
          <Image src={allConsecutiveShifts ? correct : cancel} w={"12px"} />
        </Flex>
        <Flex
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Los turnos suman más de 1 hora
          </Text>
          <Image src={shiftsLongerThanHour ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
    </Box>
  );
};

export default OfferScheduleValidation;
