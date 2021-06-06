import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Lib
import { formattedSalary } from '../../lib/formattedSalary';
import Link from 'react-router-dom';

// Components
import Separator from './Separator';
import SideTitle from './SideTitle';
import FlexText from './FlexText';
import DateTag from './DateTag';
import Options from './Options';

const PastProjectSide = ({ data }) => {
  return (
    <Box>
      <Flex alignItems={'center'} justifyContent={'space-between'} mb={2}>
        <DateTag dates={data.projectData.dates} />
        {/* <Link to={`#`}>
          <Options>Más información</Options>
        </Link> */}
        <Options>Más información</Options>
      </Flex>
      <SideTitle>Nombre</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        <Text>
          {data.projectData.name
            ? data.projectData.name
            : data.projectOffers[0].offerData.name}
        </Text>
        <Text fontSize={14} color='primary'>
          {data.projectData.location.address}
        </Text>
      </Flex>
      <Separator top={4} bottom={2} />
      <SideTitle>Fecha</SideTitle>
      <Flex flexDirection={'column'} mb={4}>
        <DateTag dates={data.projectData.dates} />
      </Flex>
      {/* 
      -Ofertas
      -Costes
      -Descargar contratos y nominas 
      */}
    </Box>
  );
};

export default PastProjectSide;
