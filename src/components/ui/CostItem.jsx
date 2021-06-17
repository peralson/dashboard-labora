import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { formattedSalary } from "../../lib/formattedSalary";

const CostItem = ({ name, amount }) => (
  <Flex
    p={4}
    borderRadius={10}
    borderWidth={1}
    borderColor={"darkLight"}
    flexDir={"column"}
    alignItems={"center"}
  >
    <Text mb={1} fontWeight={"bold"}>
      {formattedSalary(amount)}€
    </Text>
    <Text fontSize={14} color={"primary"} textAlign={"center"}>
      {name}
    </Text>
  </Flex>
);

export default CostItem;
