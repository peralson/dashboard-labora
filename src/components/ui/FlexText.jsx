import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const FlexText = ({ left, right, bold }) => (
  <Flex alignItems={"center"}>
    <Text
      flex={1}
      fontSize={14}
      lineHeight={2}
      fontWeight={bold ? "bold" : "medium"}
    >
      {left}
    </Text>
    <Text lineHeight={2} fontSize={14} color={"grey.dark"}>
      {right}
    </Text>
  </Flex>
);

export default FlexText;
