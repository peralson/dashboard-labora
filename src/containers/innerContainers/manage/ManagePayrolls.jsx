import React, { useContext, useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchPayrolls } from '../../../store/actions/payrolls';

import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../../context/SelectedItemContext';

const PayrollCard = ({ data }) => {
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
      py={2}
      px={3}
      mt={2}
      alignItems={'center'}
      borderWidth={1}
      borderColor={isActive ? 'white' : 'darkLight'}
      _hover={{ borderColor: 'white' }}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(data);
          setSelectedManageSide('payrolls');
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
          border={'2px solid'}
          borderColor='darkLight'
          bg={data.status === 'finished' ? 'green' : 'yellow'}
        />
      </Flex>
    </Flex>
  );
};

const ManagePayrolls = ({ search, payrolls, fetchPayrolls }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (payrolls.length === 0) {
        setLoading(true);
      }
      setError(null);
      try {
        await fetchPayrolls();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPayrolls =
    payrolls &&
    payrolls.filter(
      (payroll) =>
        payroll.offerData.category.toLowerCase().includes(search) ||
        payroll.workerData.name.toLowerCase().includes(search) ||
        payroll.eventData.name.toLowerCase().includes(search)
    );

  return loading ? (
    <Text textAlign={'center'} py={10}>
      Cargando...
    </Text>
  ) : error ? (
    <Text textAlign={'center'} py={10}>
      Ha ocurrido un error
    </Text>
  ) : filteredPayrolls.length === 0 ? (
    <Text textAlign={'center'} py={10}>
      No hay ninguna nómina
    </Text>
  ) : (
    <Flex w='100%' flexDirection='column'>
      {filteredPayrolls.map((payroll, index) => (
        <PayrollCard key={index} data={payroll} />
      ))}
    </Flex>
  );
};

const mapDispatchToProps = {
  fetchPayrolls,
};

const mapStateToProps = (state) => {
  return {
    payrolls: state.payrolls.payrolls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePayrolls);
