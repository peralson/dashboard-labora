import React from "react";
import { Text, Box } from "@chakra-ui/react";

// Components
import Separator from "../ui/Separator";
import FlexText from "../ui/FlexText";

const ContactSide = ({ contact }) => (
  <>
    <Text fontSize={24} fontWeight={"bold"}>
      Datos de contacto
    </Text>
    <Separator top={2} bottom={2} />
    <Box mt={2}>
      <FlexText left={"Email"} right={contact.mail} />
      <FlexText left={"Teléfono"} right={contact.phoneNumber} />
    </Box>
  </>
);

export default ContactSide;
