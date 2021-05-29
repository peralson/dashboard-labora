import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Lib
import { formattedSalary } from '../../lib/formattedSalary';

// Components
import Separator from './Separator';
import SideTitle from './SideTitle';
import FlexText from './FlexText';

const PayrollSide = ({ data }) => {
  console.log('sideData:', data);
  return (
    <Box>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Text fontSize={12} lineHeight={1.5} color={'primary'}>
            {data.category.toUpperCase()}
          </Text>
          <Text fontSize={19} fontWeight={'bold'} lineHeight={1.5}>
            {data.event}
          </Text>
        </Box>
      </Flex>
      <Separator top={4} bottom={2} />
      <SideTitle>Nombre</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.worker.name}
      </Flex>
      <SideTitle>Tipo de contrato</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.type}
      </Flex>
      <SideTitle>Fecha</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.date}
      </Flex>
      <SideTitle>Categoría</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {data.category}
      </Flex>
      <SideTitle>Costes</SideTitle>
      <FlexText
        left='Salario base'
        right={formattedSalary(data.costs.salary) + '€'}
      />
      <Separator top={1} bottom={1} />
      <FlexText
        left='Hora extra'
        right={formattedSalary(data.costs.extraSalary) + '€'}
      />
      <Separator top={1} bottom={1} />
      {data.costs.extras.map(
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
        {data.hours + 'h'}
      </Flex>
      <SideTitle>Coste total</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        {formattedSalary(data.costs.total) + '€'}
      </Flex>
    </Box>
  );
};

export default PayrollSide;
