import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Lib
import { Link } from 'react-router-dom';
import { formattedSalary } from '../../lib/formattedSalary';
import { getTotalCost } from '../../lib/getTotalCost';

// Components
import Separator from './Separator';
import SideTitle from './SideTitle';
import DateTag from './DateTag';
import FlexText from './FlexText';

const OfferItem = ({ data }) => {
  const PropertyItem = ({ info, title }) => {
    return (
      <Flex
        flexDirection='row'
        bg='translucid'
        px={2}
        py={2}
        textAlign='center'
        borderRadius={10}
      >
        <Text fontSize={14}>
          {title && title + ':'} {info}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex
      cursor={'pointer'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      bg={'darkLight'}
      _hover={{ border: '1px solid white', transform: 'scale(1.02)' }}
      p={3}
      pt={4}
      borderRadius={10}
      borderWidth={1}
      borderColor='translucid'
      mb={2}
    >
      <Box width='100%' flex='1'>
        <Text fontSize={12} color='primary' lineHeight={1}>
          {data.offerData.category.toUpperCase()}
        </Text>
        <Text fontSize={14} mt={1} lineHeight={1}>
          {data.offerData.name}
        </Text>
      </Box>
      <Flex
        flexDirection='row'
        width='100%'
        justifyContent={'space-between'}
        mt={2}
      >
        <PropertyItem
          info={formattedSalary(data.offerData.salary) + ' €'}
          title='Salario'
        />
        <PropertyItem info={data.offerData.qty + ' h'} />
        <PropertyItem
          info={data.offerData.qty * data.offerData.salary + ' €'}
          title='Coste'
        />
      </Flex>
    </Flex>
  );
};

const getCosts = (projectOffers) => {
  return (
    <Box>
      {projectOffers.map((offer) => {
        return (
          <Box>
            <FlexText
              left={`Salario ${offer.offerData.category}`}
              right={formattedSalary(offer.offerData.salary) + ' €'}
            />
            <FlexText
              left={`Extra ${offer.offerData.category}`}
              right={formattedSalary(offer.offerData.extraSalary) + ' €'}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const PastProjectSide = ({ data }) => {
  return (
    <Box>
      <Flex alignItems={'center'} justifyContent={'space-between'} mb={2}>
        <DateTag dates={data.projectData.dates} />
      </Flex>
      <Flex flexDirection={'column'} mb={4}>
        <Text fontWeight='bold'>
          {data.projectData.name
            ? data.projectData.name
            : data.projectOffers[0].offerData.name}
        </Text>
        <Text fontSize={14} color='primary'>
          {data.projectData.location.address}
        </Text>
        <Text mt={6} flex={1} fontSize={14} fontWeight='medium'>
          {data.projectData.description}
        </Text>
      </Flex>

      <Separator top={4} bottom={2} />
      {data.projectOffers.length > 0 && (
        <Flex flexDirection='column'>
          <SideTitle>Ofertas</SideTitle>
          {data.projectOffers.map((offer) => (
            <Link to={`/gestion/o/${offer.id}`}>
              <OfferItem data={offer} />
            </Link>
          ))}
        </Flex>
      )}
      <SideTitle>Costes</SideTitle>
      {data.projectOffers.length > 0 && (
        <Box flexDirection='column'>
          {getCosts(data.projectOffers)}
          <FlexText
            left={<SideTitle>Coste total</SideTitle>}
            right={
              <SideTitle>
                {formattedSalary(getTotalCost(data.projectOffers)) + ' €'}
              </SideTitle>
            }
          />
        </Box>
      )}
      <Flex flexDirection='row' mt={4}>
        <a
          href={
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
          target='_blank'
          rel='noopener noreferrer'
        >
          <Flex
            borderRadius={8}
            _hover={{ cursor: 'pointer' }}
            border={'1px solid'}
            borderColor={'translucid'}
            bg={'darkLight'}
            alignItems={'center'}
            px={4}
            mr={4}
            py={2}
            justifyContent='center'
            textAlign='center'
          >
            Descargar contratos
          </Flex>
        </a>
        <a
          href={
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          }
          target='_blank'
          rel='noopener noreferrer'
        >
          <Flex
            textAlign='center'
            justifyContent='center'
            borderRadius={8}
            _hover={{ cursor: 'pointer' }}
            border={'1px solid'}
            borderColor={'translucid'}
            bg={'darkLight'}
            alignItems={'center'}
            px={4}
            py={2}
          >
            Descargar nóminas
          </Flex>
        </a>
      </Flex>
    </Box>
  );
};

export default PastProjectSide;
