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
    justifyContent={left ? "flex-start" : "flex-end"}
    _hover={{ background: danger ? "red.smooth" : "translucid" }}
    opacity={inactive && 0.4}
    px={2.5}
    py={2}
    borderRadius={10}
    cursor={"pointer"}
    onClick={onSelect}
  >
    {left && icon && <Image src={icon} mr={2} w={"12px"} />}
    <Text color={danger ? "red.full" : "primary"}>{children}</Text>
    {right && icon && <Image src={icon} ml={2} w={"12px"} />}
  </Flex>
);

export default TopButton;
