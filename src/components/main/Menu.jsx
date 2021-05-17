import React, { useState, useEffect, useReducer } from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ children }) => {
  return (
    <>
      <Flex
        bg="#191735"
        maxW="160px"
        flex="1"
        flexDirection="column"
        alignItems="center"
        borderRight="1px"
        borderRightColor="#9D9EA3"
      >
        <Link to="/ofertas">
          <Flex pt={4} alignItems="center" flexDirection="column">
            <img
              width="60px"
              src={
                'https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png'
              }
              alt="Ofertas"
            />
            <Text color="white">Ofertas</Text>
          </Flex>
        </Link>
        <Link to="/trabajadores">
          <Flex pt={4} alignItems="center" flexDirection="column">
            <img
              width="60px"
              src={
                'https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png'
              }
              alt="Trabajadores"
            />
            <Text color="white">Trabajadores</Text>
          </Flex>
        </Link>
        <Link to="/manage">
          <Flex pt={4} alignItems="center" flexDirection="column">
            <img
              width="60px"
              src={
                'https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png'
              }
              alt="Gestión"
            />
            <Text color="white">Gestión</Text>
          </Flex>
        </Link>
        <Link to="/empresa">
          <Flex pt={4} alignItems="center" flexDirection="column">
            <img
              width="60px"
              src={
                'https://connectingclues.es/wp-content/uploads/2019/09/white-play-icon-png-7.png'
              }
              alt="Mi empresa"
            />
            <Text color="white">Mi empresa</Text>
          </Flex>
        </Link>
      </Flex>
      {children}
    </>
  );
};

export default Menu;
