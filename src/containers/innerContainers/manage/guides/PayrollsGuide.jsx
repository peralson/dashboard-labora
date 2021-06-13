import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const PayrollsGuide = () => (
  <Flex
    alignItems={"center"}
    py={2}
    px={3}
    mt={2}
    borderBottomWidth={2}
    borderColor={"darkLight"}
  >
    <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
      Fecha
    </Text>
    <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
      Categoría
    </Text>
    <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
      Trabajador
    </Text>
    <Text flex={1} mr={2} fontWeight={"medium"} fontSize={14}>
      Estado
    </Text>
  </Flex>
);

export default PayrollsGuide;
