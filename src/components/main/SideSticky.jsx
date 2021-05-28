import React from "react";
import { Flex } from "@chakra-ui/layout";

const SideSticky = ({ children }) => (
  <Flex
    position={"sticky"}
    top={0}
    h={"100vh"}
    flexDirection={"column"}
    alignItems={"flex-start"}
    py={4}
  >
    {children}
  </Flex>
);

export default SideSticky;
