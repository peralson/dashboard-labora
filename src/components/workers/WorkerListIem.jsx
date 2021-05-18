import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

const WorkerListIem = (worker) => {
  const { name, email, image, phone, categories, tags } = worker.worker;
  console.log(image);
  return (
    <Box
      width='100%'
      h='60px'
      bg='white'
      borderBottom='grey'
      borderWidth='1px'
    >
      <Flex
        w='100%'
        h='100%'
        alignItems='center'
        p='0px 15px'
        flexDirection='row'
      >
        <Image w='35px' hw='35px' borderRadius='35px' src={image} alt={name} />
        <Text>{name}</Text>
        <Text>{email}</Text>
        <Text>{categories[0]}</Text>
        <Text>{tags[0]}</Text>
      </Flex>
    </Box>
  );
}

export default WorkerListIem
