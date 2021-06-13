import React, { useState, useEffect, useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchAllContracts } from '../../../store/actions/contracts';

import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../../context/SelectedItemContext';

const ContractCard = ({ data }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const { setSelectedManageSide } = useContext(SelectedManageSide);
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
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(data);
          setSelectedManageSide('contracts');
        }
      }}
    >
      <Text flex={2} fontSize={12} mr={2}>
        {data.eventData.date}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.offerData.category}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.workerData.name}
      </Text>
      <Flex flex={1}>
        <Box
          w={'30px'}
          h={'30px'}
          borderRadius={1000}
          borderWidth={2}
          borderColor={'darkLight'}
          bg={data.status === 'finished' ? 'green' : 'yellow'}
        />
      </Flex>
    </Flex>
  );
};

const ManageContracts = ({ search, contracts, fetchAllContracts }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (contracts.length === 0) {
        setLoading(true)
      }
      setError(null);
      try {
        await fetchAllContracts();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredContracts = contracts && contracts.filter(
    (contract) =>
      contract.offerData.category.toLowerCase().includes(search) ||
      contract.workerData.name.toLowerCase().includes(search)
  );

  return (
    loading ? (
      <Text textAlign={"center"} py={10}>
        Cargando...
      </Text>
    ) : error ? (
      <Text textAlign={"center"} py={10}>
        Ha ocurrido un error
      </Text>
    ) : (
      <Flex w='100%' flexDirection='column'>
        {filteredContracts.map((contract, index) => <ContractCard key={index} data={contract} />)}
      </Flex>
    )
  );
};

const mapDispatchToProps = {
  fetchAllContracts,
};

const mapStateToProps = (state) => {
  return {
    contracts: state.contracts.contracts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageContracts);
