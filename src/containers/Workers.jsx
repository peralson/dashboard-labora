import React from 'react';
import { Box, Flex, Text, Heading, Spacer } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

// Components
import PageGrid from '../components/main/PageGrid';
import Menu from '../components/main/Menu';
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import WorkerListItem from '../components/workers/WorkerListIem';

const workers = [
  {
    name: 'Eloy',
    email: 'eloy@gmail.com',
    image: 'https://bit.ly/sage-adebayo',
    phone: 77777,
    categories: ['camarero'],
    tags: ['gafas', 'alto', 'delgado'],
  },
  {
    name: 'Peralta',
    email: 'peralson@gmail.com',
    image: 'https://bit.ly/dan-abramov',
    phone: 9999,
    categories: ['limpiador'],
    tags: ['moreno', 'delgado'],
  },
  {
    name: 'Martino',
    email: 'mpal@mail.com',
    image: 'https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg',
    phone: 5459,
    categories: ['conserje'],
    tags: ['rubio', 'delgado'],
  },
  {
    name: 'Peralta',
    email: 'pe@ail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlIC6mj9KXGnVloMBpbZ5MULyumav2TarjA&usqp=CAU',
    phone: 4434399,
    categories: ['camarero'],
    tags: ['moreno', 'delgado'],
  },
];

const Separator = (props) => {
  const { width = '100%', border = '1px', color = 'white', top, bot } = props;
  return (
    <Box
      w={width}
      borderBottomWidth={border}
      borderColor={color}
      marginBottom={bot}
      marginTop={top}
    />
  );
};

const SearchBar = (props) => {
  const { width } = props;
  return (
    <Box
      width={width}
      h='35px'
      bg='white'
      borderRadius='50px'
      borderWidth='1px'
      borderColor='#373557'
    >
      <Flex w='100%' h='100%' alignItems='center' p='0px 15px'>
        <Text color='grey'>Busca a un trabajador</Text>
      </Flex>
    </Box>
  );
};

const Workers = () => {
  return (
    <PageGrid>
      <Menu />
      <Main>
        <Heading size='md' color='white'>
          Trabajadores
        </Heading>
        <Separator color='#373557' top='10px' bot='15px' />
        <Flex flexDirection='row' w='100%' h='35px'>
          <SearchBar width='70%' />
          <Spacer />
          <Box
            w='120px'
            h='100%'
            bg='white'
            marginRight='5px'
            marginLeft='5px'
          ></Box>
          <Spacer />
          <Box w='120px' h='100%' bg='white'></Box>
        </Flex>
        <Separator color='#373557' top='15px' bot='15px' />
        <Box w='100%' bg='white'>
        <Table variant='unstyled' w='100%'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Nombre</Th>
              <Th>Correo</Th>
              <Th>Teléfono</Th>
              <Th>Categorias</Th>
              <Th>Etiquetas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workers.map((worker) => (
              <Tr key={worker.name} >
                <Td></Td>
                <Td><Image src={worker.image} alt={worker.name} /></Td>
                <Td>{worker.name}</Td>
                <Td>{worker.email}</Td>
                <Td>{worker.phone}</Td>
                <Td>{worker.categories[0]}</Td>
                <Td>{worker.tags[0]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </Box>
      </Main>
      <Side></Side>
    </PageGrid>
  );
};

export default Workers;
