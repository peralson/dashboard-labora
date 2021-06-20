import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import NoWorkers from "../../assets/svg/NoWorkers.svg";

const NoWorker = ({ text }) => (
  <Flex alignItems={"center"} flexDirection={"column"} p={6}>
    <Image src={NoWorkers} alt={"Oh vaya!"} maxW={"180px"} />
    <Text mt={4} fontSize={19} fontWeight={"bold"}>
      ¡Oh vaya!
    </Text>
    <Text mt={1} fontSize={14} textAlign={"center"}>
      {text}
    </Text>
  </Flex>
);

export default NoWorker;
