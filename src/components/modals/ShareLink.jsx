import React, { useState, useEffect } from 'react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import MultipleSelectList from '../ui/MultipleSelectList';
import { MdContentCopy } from 'react-icons/md';

const ShareLink = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [link, setLink] = useState();
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    createLink(selectedItems);
    setCopy(false);
  }, [selectedItems]);

  const handleSelelect = (e) => {
    if (!selectedItems.includes(e.target.name)) {
      setSelectedItems([...selectedItems, e.target.name]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== e.target.name));
    }
  };

  const createLink = (categories) => {
    if (categories.length > 0) {
      let catgs = '';
      categories.forEach((cat) => {
        catgs = catgs + cat.toLowerCase();
      });
      setLink(`http://localhost:3000/registro/${catgs}`);
    } else {
      setLink();
    }
  };

  const handleClick = () => {
    navigator.clipboard.writeText(link);
    setCopy(true);
  };

  return (
    <Box>
      <Text mb='10px'>Selecciona categoría(s) para obtener el enlace:</Text>
      <MultipleSelectList
        title='Categorias'
        flex='1'
        bg='dark'
        mb={4}
        current={selectedItems}
        values={data}
        onChange={handleSelelect}
      />
      {link && (
        <Button
          size='md'
          height='48px'
          width='100%'
          bg='translucid'
          color='grey'
          _focus={{ borderColor: 'none' }}
          onClick={handleClick}
        >
          <Flex w='100%' justifyContent='center' alignContent='center'>
            <Text w='100%' fontSize={12}>
              {link}
            </Text>
            <MdContentCopy />
          </Flex>
        </Button>
      )}
      {copy && <Text mt={2}>Enlace copiado!</Text>}
    </Box>
  );
};

export default ShareLink;
