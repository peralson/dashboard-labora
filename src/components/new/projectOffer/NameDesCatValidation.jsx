import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { NewProjectOfferContext } from "../../../context/newCreations";
import { validateNameDescCat } from "../../../lib/forms/newProjectOfferState";
import Separator from "../../ui/Separator";

// svg
import cancel from "../../../assets/svg/cancel.svg";
import correct from "../../../assets/svg/correct.svg";

const NameDescCatValidation = () => {
  const { state } = useContext(NewProjectOfferContext);
  const { hasName, isNameLong, hasCategory } = validateNameDescCat(state);
  return (
    <Box>
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Nombre
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6}>
            Introduce un nombre
          </Text>
          <Image src={hasName ? correct : cancel} w={"12px"} />
        </Flex>
        <Flex
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Text fontSize={14} lineHeight={1.6}>
            Más de 3 caracteres
          </Text>
          <Image src={isNameLong ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
      <Separator top={4} bottom={4} />
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Categoría
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6}>
            Selecciona entre las categorías
          </Text>
          <Image src={hasCategory ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
    </Box>
  );
};

export default NameDescCatValidation;
