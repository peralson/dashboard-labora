import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Components
import Main from '../components/main/Main';
import TopMain from '../components/main/TopMain';
import Side from '../components/main/Side';
import SearchBar from '../components/ui/SearchBar';
import Separator from '../components/ui/Separator';

const Manage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Main>
        <TopMain>
          <Flex>
            <SearchBar
              placeholder='Busca proyectos, nóminas, contratos...'
              onChange={handleSearch}
            />
            <Flex
              _hover={{ cursor: 'pointer' }}
              bg='translucid'
              borderRadius={8}
              ml={2}
              alignItems='center'
              p='0px 16px'
            >
              <Text lineHeight={0} fontWeight='bold' fontSize='14px'>
                Mis plantillas
              </Text>
            </Flex>
          </Flex>
        </TopMain>
      </Main>
      <Side></Side>
    </>
  );
};

export default Manage;
