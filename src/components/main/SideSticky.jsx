import React from "react";
import { Flex } from "@chakra-ui/layout";

const SideSticky = ({ children }) => (
  <Flex
    maxH={"100vh"}
    flexDirection={"column"}
    alignItems={"flex-start"}
    py={4}
  >
    {children}
  </Flex>
);

export default SideSticky;
