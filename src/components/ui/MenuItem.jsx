import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';

const MenuItem = ({ text, image, activeImage, top }) => (
  <Flex
    mt={top ? null : 4}
    p={2}
    borderRadius="10px"
    alignItems="center"
    flexDirection="column"
    bg={activeImage ? "translucid" : null}
  >
    <img width="30px" src={activeImage ? activeImage : image} alt={text} />
    <Text mt={0.5} color="white">{text}</Text>
  </Flex>
);

export default MenuItem;
