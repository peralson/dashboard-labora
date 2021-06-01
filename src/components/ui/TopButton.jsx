import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const TopButton = ({
  children,
  icon,
  onSelect,
  left,
  right,
  danger,
  inactive,
}) => (
  <Flex
    justifyContent={"flex-end"}
    _hover={{ background: danger ? "red.smooth" : "translucid" }}
    opacity={inactive && 0.4}
    px={2.5}
    py={2}
    borderRadius={10}
    cursor={"pointer"}
    onClick={onSelect}
  >
    {left && <Image src={icon} mr={2} w={"12px"} />}
    <Text fontSize={16} color={danger ? "red.full" : "primary"}>
      {children}
    </Text>
    {right && <Image src={icon} ml={2} w={"12px"} />}
  </Flex>
);

export default TopButton;
