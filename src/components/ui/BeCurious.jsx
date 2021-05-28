import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import beCurious from "../../assets/svg/be-curious.svg";

const BeCurious = ({ text }) => (
  <Flex alignItems={"center"} flexDirection={"column"} p={6}>
    <Image src={beCurious} alt={"Curiosea"} maxW={"180px"} />
    <Text mt={4} fontSize={19} fontWeight={"bold"}>
      ¡Curiosea!
    </Text>
    <Text mt={1} fontSize={14} textAlign={"center"}>
      {text}
    </Text>
  </Flex>
);

export default BeCurious;
