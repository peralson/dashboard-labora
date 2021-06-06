import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/image";

const MenuItem = ({ text, image, activeImage }) => (
  <Flex
    py={3}
    pr={3}
    w={"100%"}
    borderRightWidth={2}
    borderRightColor={activeImage ? "primary" : "transparent"}
    alignItems={"center"}
    flexDirection={"row"}
    _hover={{ borderRightColor: !activeImage && "darkLight" }}
  >
    <Image w={"20px"} src={activeImage ? activeImage : image} alt={text} />
    <Text ml={2} fontSize={16}>
      {text}
    </Text>
  </Flex>
);

export default MenuItem;
