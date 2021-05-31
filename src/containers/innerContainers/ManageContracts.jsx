import React, { useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { SelectedItemManage } from '../../context/SelectedItemContext';
import Separator from '../../components/ui/Separator';

const ContractCard = ({ data }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const isActive = selectedItemManage
    ? selectedItemManage.id === data.id
    : false;

  return (
    <Flex
      cursor={'pointer'}
      borderRadius={8}
      p={2}
      pl={2}
      mt={2}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={isActive ? 'white' : 'darkLight'}
      _hover={{ borderColor: 'white' }}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
        } else {
          setSelectedItemManage(data);
        }
      }}
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
      <Flex flex={1}>
        <Box
          w={'30px'}
          h={'30px'}
          borderRadius={1000}
          border={'2px solid'}
          borderColor='darkLight'
          bg={data.status === 'finished' ? 'green' : 'yellow'}
        />
      </Flex>
    </Flex>
  );
};

const ManageContracts = (props) => {
  const { data } = props;
  return (
    <>
      <Flex alignItems={'center'} p={2} pl={2} mt={2}>
        <Text flex={2} mr={2} fontWeight={'medium'} fontSize={14}>
          Fecha
        </Text>
        <Text flex={2} mr={2} fontWeight={'medium'} fontSize={14}>
          Categoría
        </Text>
        <Text flex={2} mr={2} fontWeight={'medium'} fontSize={14}>
          Trabajador
        </Text>
        <Text flex={1} mr={2} fontWeight={'medium'} fontSize={14}>
          Estado
        </Text>
      </Flex>
      <Separator />
      <Flex w='100%' flexDirection='column'>
        {data.map((e) => {
          return <ContractCard key={e.id} data={e} />;
        })}
      </Flex>
    </>
  );
};

export default ManageContracts;
