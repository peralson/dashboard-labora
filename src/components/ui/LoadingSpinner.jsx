import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Flex
    w={"100%"}
    justifyContent={"center"}
    flexDirection={"column"}
    alignItems={"center"}
    py={8}
  >
    <Spinner mt={2} color={"primary"} />
    <Text mt={4}>Cargando...</Text>
  </Flex>
);

export default LoadingSpinner;
