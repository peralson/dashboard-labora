import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const SideSelectorOffer = (props) => (
  <Flex
    _hover={{ borderColor: "white" }}
    flexDirection={"column"}
    py={4}
    px={2}
    cursor={"pointer"}
    w={"100%"}
    alignItems={"center"}
    justifyContent={"center"}
    borderRadius={10}
    border={"1px solid"}
    borderColor={"darkLight"}
    {...props}
  >
    <Image src={props.image} w={"32px"} mb={4} />
    <Text textAlign={"center"} fontSize={18} lineHeight={1} fontWeight={"bold"}>
      {props.title}
    </Text>
    <Text textAlign={"center"} fontSize={14} lineHeight={2}>
      {props.desc}
    </Text>
  </Flex>
);

export default SideSelectorOffer;
