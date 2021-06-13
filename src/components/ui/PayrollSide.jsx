import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Lib
import { formattedSalary } from '../../lib/formattedSalary';

// Redux & Actions
import { fetchPayroll } from '../../store/actions/payrolls';

// Components
import Separator from './Separator';
import SideTitle from './SideTitle';
import FlexText from './FlexText';

const PayrollSide = ({ data }) => {
  const [link, setLink] = useState();

  useEffect(() => {
    const getLink = async () => {
      setLink(await fetchPayroll(data.offerData.id));
    };
    getLink();
  }, [data.offerData.id]);

  return (
    <Box>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={12} lineHeight={1.5} color={'primary'}>
          {data.offerData.category.toUpperCase()}
        </Text>
      </Flex>
      <SideTitle>Nombre</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.workerData.name}
      </Flex>
      <Separator top={4} bottom={2} />
      <SideTitle>Fecha</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.eventData.date}
      </Flex>
      <SideTitle>Categoría</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.offerData.category}
      </Flex>
      <SideTitle>Costes</SideTitle>
      <FlexText
        left='Salario base'
        right={formattedSalary(data.offerData.salary) + '€'}
      />
      <Separator top={1} bottom={1} />
      <FlexText
        left='Hora extra'
        right={formattedSalary(data.offerData.extraSalary) + '€'}
      />
      <Separator top={1} bottom={1} />
      {data.offerData.extras.map(
        (extra, index) =>
          extra.amount > 0 && (
            <Box key={index}>
              {index !== 0 && <Separator top={1} bottom={1} />}
              <FlexText
                left={extra.name}
                right={formattedSalary(extra.amount) + '€'}
              />
            </Box>
          )
      )}
      <SideTitle>Horas trabajadas</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {'3h'}
      </Flex>
      <SideTitle>Coste total</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {'120€'}
      </Flex>
      {link && (
        <Flex flexDirection='row'>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <Flex
              w='100%'
              borderRadius={8}
              _hover={{ cursor: 'pointer' }}
              border={'1px solid'}
              borderColor={'translucid'}
              bg={'darkLight'}
              mr={4}
              justifyContent={'center'}
              alignItems={'center'}
              px={4}
              py={2}
            >
              Ver pdf
            </Flex>
          </a>
        </Flex>
      )}
    </Box>
  );
};

export default PayrollSide;
