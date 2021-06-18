import React from "react";
import { Text, Box } from "@chakra-ui/react";

// Components
import Separator from "../ui/Separator";
import FlexText from "../ui/FlexText";

const LegalCompanySide = ({ legalData }) => {
  const {
    activity,
    address,
    cif,
    city,
    country,
    name,
    postalCode,
    regimen,
    socialNumber,
  } = legalData;

  return (
    <>
      <Text fontSize={24} fontWeight={"bold"}>
        Datos de empresa
      </Text>
      <Separator top={2} bottom={2} />
      <Box mt={2}>
        <FlexText left={"Nombre"} right={name} />
        <FlexText left={"Actividad"} right={activity} />
        <FlexText left={"CIF"} right={cif} />
        <FlexText left={"Dirección"} right={address} />
        <FlexText left={"CP"} right={postalCode} />
        <FlexText left={"Ciudad"} right={city} />
        <FlexText left={"Pais"} right={country} />
        <FlexText left={"Régimen"} right={regimen} />
        <FlexText left={"Seguridad Social"} right={socialNumber} />
      </Box>
    </>
  );
};

export default LegalCompanySide;
