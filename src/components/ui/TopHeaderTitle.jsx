import React from "react";
import { Text } from "@chakra-ui/layout";

const TopHeaderTitle = ({ children }) => {
  return (
    <Text
      flex={1}
      fontSize={19}
      lineHeight={2}
      fontWeight={"bold"}
      textAlign={"center"}
    >
      {children}
    </Text>
  );
};

export default TopHeaderTitle;
