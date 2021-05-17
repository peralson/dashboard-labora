import React from 'react';
import { Flex, Center } from '@chakra-ui/layout';
import Logo from '../../assets/img/Logo.png';

const Top = ({ children }) => (
  <Flex w="100vw" h="100vh" bg="#191735" flexDirection="column">
    <Flex w="100%" borderBottom="1px" borderBottomColor="#9D9EA3">
      <Center pt={5} pb={5} w="100%">
        <img src={Logo} alt="Logo de Labora" width="120px" />
      </Center>
    </Flex>
    <Flex flex="1">{children}</Flex>
  </Flex>
);

export default Top;
