import React from "react";
import { Text } from "@chakra-ui/layout";

const TopHeaderTitle = ({ children, ...rest }) => (
  <Text
    flex={1}
    fontSize={16}
    lineHeight={2}
    fontWeight={"bold"}
    textAlign={"center"}
    {...rest}
  >
    {children}
  </Text>
);

export default TopHeaderTitle;
