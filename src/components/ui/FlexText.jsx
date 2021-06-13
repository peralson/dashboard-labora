import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const FlexText = ({ left, right }) => (
  <Flex alignItems={"center"}>
    <Text flex={1} fontSize={14} lineHeight={2} fontWeight="medium">
      {left}
    </Text>
    <Text lineHeight={2} fontSize={14}>
      {right}
    </Text>
  </Flex>
);

export default FlexText;
