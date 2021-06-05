import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import {Button} from '@chakra-ui/react';
import MultipleSelectList from '../ui/MultipleSelectList';
import {MdLink, MdContentCopy} from "react-icons/md";

const ShareLink = ({data}) => {
  return (
    <Box>
      <Text mb='10px'>Selecciona categoría(s) para obtener el enlace:</Text>
      <MultipleSelectList
        title='Categorias'
        flex='1'
        bg='dark'
        mb={4}
        current={data}
        values={data}
        onChange={() => {}}
      />
      <Button
        size='md'
        height='48px'
        width='100%'
        bg='translucid'
        color='grey'
        _focus={{ borderColor: 'none' }}
      >
        <Flex w='100%' justifyContent='space-between' alignContent='center'>
          <MdLink /> https://wa.me/1XXXXXXXXXX? <MdContentCopy />
        </Flex>
      </Button>
    </Box>
  );
};

export default ShareLink;
