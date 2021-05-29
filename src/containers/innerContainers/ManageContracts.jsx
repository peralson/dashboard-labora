import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

const ContractCard = (props) => {
  const { data } = props;
  const isSelected = false;

  return (
    <Flex
      cursor={'pointer'}
      borderRadius={8}
      p={2}
      pl={2}
      mt={2}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={isSelected ? 'white' : 'darkLight'}
      _hover={{ borderColor: 'white' }}
    >
      <Text flex={2} fontSize={12} mr={2}>
        {data.date}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.category}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.worker.name}
      </Text>
      <Box
        w={'30px'}
        h={'30px'}
        borderRadius={1000}
        border={'2px solid'}
        borderColor='darkLight'
        bg={data.status === 'finished' ? 'green' : 'yellow'}
      />
    </Flex>
  );
};

const ManageContracts = (props) => {
  const { data } = props;
  return (
    <Flex w='100%' flexDirection='column'>
      {data.map((e) => {
        return <ContractCard key={e.id} data={e} />;
      })}
    </Flex>
  );
};

export default ManageContracts;
