import React from "react";
import { Text } from "@chakra-ui/layout";

const SideTitle = (props) => (
  <Text fontSize={16} lineHeight={2} fontWeight="bold" mb={1} {...props}>
    {props.children}
  </Text>
);

export default SideTitle;
