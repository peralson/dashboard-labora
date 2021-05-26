import React from "react";
import { Text } from "@chakra-ui/layout";

const SideTitle = ({ children }) => (
  <Text fontSize={16} lineHeight={2} fontWeight="bold" mb={1}>
    {children}
  </Text>
);

export default SideTitle;
