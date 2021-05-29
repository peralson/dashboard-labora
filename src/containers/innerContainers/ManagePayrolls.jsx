import React, { useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { SelectedItemManage } from '../../context/SelectedItemContext'

const PayrollCard = ({data}) => {
  const { selectedItemManage, setSelectedItemManage } = useContext(SelectedItemManage)
    const isActive = selectedItemManage
        ? selectedItemManage.id === data.id
        : false

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
      <Box
        w={'30px'}
        h={'30px'}
        borderRadius={1000}
        border={'2px solid'}
        borderColor='darkLight'
        bg={data.status === 'paid' ? 'green' : 'yellow'}
      />
    </Flex>
  );
};


const ManagePayrolls = ({ data }) => {
  return (
    <Flex w='100%' flexDirection='column'>
      {data.map((e) => {
        return <PayrollCard key={e.id} data={e} />;
      })}
    </Flex>
  );
}

export default ManagePayrolls