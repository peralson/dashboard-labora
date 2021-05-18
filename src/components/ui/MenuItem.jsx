import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';

const MenuItem = ({ text, image, activeImage }) => {
  return (
    <>
      {activeImage ? (
        <Flex pt={4} alignItems="center" flexDirection="column">
          <img width="60px" src={activeImage} alt="Ofertas" />
          <Text color="white">{text}</Text>
        </Flex>
      ) : (
        <Flex pt={4} alignItems="center" flexDirection="column">
          <img width="60px" src={image} alt="Ofertas" />
          <Text color="white">{text}</Text>
        </Flex>
      )}
    </>
  );
};

export default MenuItem;
