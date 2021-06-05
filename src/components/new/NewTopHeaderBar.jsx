import React from "react";
import { Flex, Box } from "@chakra-ui/layout";

// Components
import TopHeaderTitle from "../ui/TopHeaderTitle";

const NewTopHeaderBar = ({ children, leftButton, rightButton }) => (
  <Flex alignItems={"center"} justifyContent={"space-evenly"}>
    <Box maxW={"100%"}>{leftButton}</Box>
    <TopHeaderTitle>{children}</TopHeaderTitle>
    <Box maxW={"100%"}>{rightButton}</Box>
  </Flex>
);

export default NewTopHeaderBar;
