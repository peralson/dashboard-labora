import React from 'react';
import { Flex , Box, Text} from '@chakra-ui/layout';

const PastProjectCard = (props) => {
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
        {data.name}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.direction}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.workers} trabajos
      </Text>
      <Text flex={1} fontSize={12} mr={2}>
        {data.cost} €
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.date}
      </Text>
      <Box
        w={'30px'}
        h={'30px'}
        borderRadius={1000}
        border={'2px solid'}
        borderColor='darkLight'
        bg={data.status === 'finished' ? 'green' : 'yellow'}
      ></Box>
    </Flex>
  );
};

const ManageProjects = (props) => {
  const { data } = props;
  return (
    <Flex w='100%' flexDirection='column'>
      {data.map((e) => {
        return <PastProjectCard key={e.id} data={e} />;
      })}
    </Flex>
  );
};

export default ManageProjects;
