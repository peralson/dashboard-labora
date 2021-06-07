import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { NewOfferContext } from "../../../context/newCreations";
import { validateQtyTags } from "../../../lib/forms/newOfferState";
import Separator from "../../ui/Separator";

// svg
import cancel from "../../../assets/svg/cancel.svg";
import correct from "../../../assets/svg/correct.svg";

const OfferQtyTagsValidation = () => {
  const { state } = useContext(NewOfferContext);
  const { hasQty, hasEnough } = validateQtyTags(state);
  return (
    <Box>
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Cantidad
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Hay al menos 1 trabajador
          </Text>
          <Image src={hasQty ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
      <Separator top={4} bottom={4} />
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Etiquetas
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Hay suficientes trabajadores para cubrir la oferta
          </Text>
          <Image src={hasEnough ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
    </Box>
  );
};

export default OfferQtyTagsValidation;
