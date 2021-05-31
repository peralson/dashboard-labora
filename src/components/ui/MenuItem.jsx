import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/image";

const MenuItem = ({ text, image, activeImage }) => (
  <Flex
    py={3}
    px={0.5}
    borderRightWidth={2}
    borderRightColor={activeImage ? "primary" : "transparent"}
    alignItems={"center"}
    flexDirection={"column"}
    _hover={{ borderRightColor: !activeImage && "darkLight" }}
  >
    <Image w={"30px"} src={activeImage ? activeImage : image} alt={text} />
    <Text mt={0.5} fontWeight={activeImage && "bold"} fontSize={12}>
      {text}
    </Text>
  </Flex>
);

export default MenuItem;
