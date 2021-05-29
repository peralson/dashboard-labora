import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import legal from '../../assets/svg/legal.svg';

import { MdAdd } from 'react-icons/md';

const ContractTemplateCard = (props) => {
  const { data, nuevo } = props;
  const isSelected = false;

  return (
    <Flex
      flexDirection={'column'}
      py={4}
      px={2}
      mr={4}
      mb={4}
      cursor={'pointer'}
      w={120}
      h={120}
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={8}
      border={'1px solid'}
      _hover={{ borderColor: 'white' }}
      borderColor={isSelected ? 'white' : 'darkLight'}
    >
      {nuevo === true ? (
        <>
          <MdAdd fontSize={'48px'} color='#49A2D7' mb={4} />
          <Text textAlign={'center'} color='white'>
            Nueva plantilla
          </Text>
        </>
      ) : (
        <>
          <Image src={legal} w={'48px'} mb={4} />
          <Text textAlign={'center'} color='white'>
            {data.category}
          </Text>
        </>
      )}
    </Flex>
  );
};

const ManageTemplates = ({ data }) => {
  return (
    <Flex w='100%' flexDirection='column'>
      <Text
        my={4}
        color='white'
        fontSize={18}
        lineHeight={1}
        fontWeight={'bold'}
      >
        Contratos
      </Text>
      {data.length > 0 ? (
        <Flex w='100%' flexDirection='row' wrap='wrap'>
          {data.map((e) => {
            return <ContractTemplateCard key={e.id} data={e} nuevo={false} />;
          })}
          <ContractTemplateCard nuevo={true} />
        </Flex>
      ) : (
        <ContractTemplateCard nuevo={true} />
      )}
    </Flex>
  );
};

export default ManageTemplates;
