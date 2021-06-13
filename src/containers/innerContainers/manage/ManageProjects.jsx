import React, { useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';
import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../../context/SelectedItemContext';

// Libs
import { getTotalCost } from '../../../lib/getTotalCost';
import { formattedSalary } from '../../../lib/formattedSalary';


// Components
import moment from 'moment';
import 'moment/locale/es';
import Separator from '../../../components/ui/Separator';

const PastProjectCard = ({ data }) => {
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
          setSelectedManageSide('projects');
        }
      }}
    >
      <Text flex={2} fontSize={12} mr={2}>
        {data.projectData.name
          ? data.projectData.name
          : data.projectOffers[0].offerData.name
          ? data.projectOffers[0].offerData.name
          : 'Sin nombre'}
      </Text>
      <Text flex={3} fontSize={12} mr={2}>
        {data.projectData.location.address}
      </Text>
      <Text ml={2} flex={1} fontSize={12} mr={2}>
        {data.projectOffers.length}
      </Text>
      <Text flex={1} fontSize={12} mr={2}>
      {formattedSalary(getTotalCost(data.projectOffers)) + ' €'}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.projectData.dates[0]._seconds ===
        data.projectData.dates[data.projectData.dates.length - 1]._seconds
          ? moment(data.projectData.dates[0]._seconds * 1000).format('D MMMM')
          : `${moment(data.projectData.dates[0]._seconds * 1000).format(
              'D MMMM'
            )} - ${moment(
              data.projectData.dates[data.projectData.dates.length - 1]
                ._seconds * 1000
            ).format('D MMMM')}`}
      </Text>
      <Flex flex={1}>
        <Box
          w={'30px'}
          h={'30px'}
          borderRadius={1000}
          border={'2px solid'}
          borderColor='darkLight'
          bg={data.status === 'finished' ? 'green' : 'yellow'}
        ></Box>
      </Flex>
    </Flex>
  );
};

const ManageProjects = ({data}) => {
  console.log('projects', data)
  return (
    <>
      <Flex alignItems={'center'} p={2} pl={2} mt={2}>
        <Text flex={2} mr={2} fontWeight={'medium'} fontSize={14}>
          Nombre
        </Text>
        <Text flex={3} mr={2} fontWeight={'medium'} fontSize={14}>
          Lugar
        </Text>
        <Text flex={1} mr={2} fontWeight={'medium'} fontSize={14}>
          Ofertas
        </Text>
        <Text flex={1} mr={2} fontWeight={'medium'} fontSize={14}>
          Coste
        </Text>
        <Text flex={2} mr={2} fontWeight={'medium'} fontSize={14}>
          Fecha
        </Text>
        <Text flex={1} fontWeight={'medium'} fontSize={14}>
          Estado
        </Text>
      </Flex>
      <Separator />
      <Flex w='100%' flexDirection='column'>
        {data.map((e) => {
          return <PastProjectCard key={e.id} data={e} />;
        })}
      </Flex>
    </>
  );
};

export default ManageProjects;
