import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const ProjectsGuide = () => (
  <Flex
    alignItems={"center"}
    py={2}
    px={3}
    mt={2}
    borderBottomWidth={2}
    borderColor={"darkLight"}
  >
    <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
      Nombre
    </Text>
    <Text flex={3} mr={2} fontWeight={"medium"} fontSize={14}>
      Lugar
    </Text>
    <Text flex={1} mr={2} fontWeight={"medium"} fontSize={14}>
      Ofertas
    </Text>
    <Text flex={1} mr={2} fontWeight={"medium"} fontSize={14}>
      Coste
    </Text>
    <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
      Fecha
    </Text>
    <Text flex={1} fontWeight={"medium"} fontSize={14}>
      Estado
    </Text>
  </Flex>
);

export default ProjectsGuide;
