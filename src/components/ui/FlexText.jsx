import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const FlexText = ({ left, right, bold }) => (
  <Flex alignItems={"center"} justifyContent={"space-between"}>
    <Text
      fontSize={14}
      lineHeight={2}
      fontWeight={bold ? "bold" : "medium"}
    >
      {left}
    </Text>
    <Text
      flex={1}
      ml={3}
      textAlign={"right"}
      lineHeight={2}
      fontSize={14}
      color={"grey.dark"}
      isTruncated
    >
      {right}
    </Text>
  </Flex>
);

export default FlexText;
