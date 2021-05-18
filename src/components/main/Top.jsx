import React from 'react';
import { Flex, Center, Box } from '@chakra-ui/layout';
import Logo from '../../assets/img/Logo.png';

const Top = ({ children }) => (
  <Flex w="100vw" flexDirection="column">
    <Box position="fixed" bg="dark" w="100%" h="60px" borderBottomWidth="1px" borderBottomColor="translucid">
      <Center h="100%">
        <img src={Logo} alt="Logo de Labora" width="120px" />
      </Center>
    </Box>
    <Box pt={2} pb={2} mt="60px">
      {children}
    </Box> 
  </Flex>
);

export default Top;
