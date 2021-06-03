import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const AccentButton = (props) => (
  <Flex
    _hover={{ cursor: "pointer" }}
    bg={"accent"}
    borderRadius={8}
    ml={2}
    alignItems={"center"}
    px={4}
    onClick={props.onClick}
    {...props}
  >
    {props.iconLeft && <Image src={props.iconLeft} w={"10px"} mr={2} />}
    <Text lineHeight={0} fontWeight="bold" fontSize={14}>
      {props.children}
    </Text>
    {props.iconRight && <Image src={props.iconRight} w={"10px"} ml={2} />}
  </Flex>
);

export default AccentButton;
