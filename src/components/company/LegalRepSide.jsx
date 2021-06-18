import React from "react";
import { Text, Box, Image } from "@chakra-ui/react";

// Components
import Separator from "../ui/Separator";
import FlexText from "../ui/FlexText";

const LegalRepSide = ({ repData }) => {
  const { name, legalId, sign } = repData;

  return (
    <>
      <Text fontSize={24} fontWeight={"bold"}>
        Representante legal
      </Text>
      <Separator top={2} bottom={2} />
      <Box mt={2}>
        <FlexText left={"Nombre"} right={name} />
        <FlexText left={"DNI"} right={legalId} />
        <FlexText left={"Firma"} />
        <Box mt={2} borderRadius={10} overflow={"hidden"} maxW={"60px"}>
          <Image src={sign} alt={"firma del representante legal"} />
        </Box>
      </Box>
    </>
  );
};

export default LegalRepSide;
