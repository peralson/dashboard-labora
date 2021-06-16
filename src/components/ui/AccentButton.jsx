import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const AccentButton = ({
  iconleft,
  iconright,
  onClick,
  children,
  ...rest
}) => (
  <Flex
    _hover={{ cursor: "pointer" }}
    bg={"accent"}
    borderRadius={8}
    ml={2}
    alignItems={"center"}
    px={4}
    onClick={onClick}
    {...rest}
  >
    {iconleft && <Image src={iconleft} w={"10px"} mr={2} />}
    <Text lineHeight={0} fontWeight="bold" fontSize={14}>
      {children}
    </Text>
    {iconright && <Image src={iconright} w={"10px"} ml={2} />}
  </Flex>
);

export default AccentButton;
