import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const AccentButton = ({ children, onClick, iconLeft, iconRight }) => (
  <Flex
    _hover={{ cursor: "pointer" }}
    bg={"accent"}
    borderRadius={8}
    ml={2}
    alignItems={"center"}
    px={4}
    onClick={onClick}
  >
    {iconLeft && <Image src={iconLeft} w={"10px"} mr={2} />}
    <Text lineHeight={0} fontWeight="bold" fontSize={14}>
      {children}
    </Text>
    {iconRight && <Image src={iconRight} w={"10px"} ml={2} />}
  </Flex>
);

export default AccentButton;
