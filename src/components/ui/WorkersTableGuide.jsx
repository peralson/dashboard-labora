import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/react';

const WorkersTableGuide = ({
  isChecked,
  isIndeterminate,
  handleGlobalCheck,
}) => (
  <Flex alignItems={'center'} p={2} pl={0} mt={2}>
    <Flex flex={2} alignItems={'center'} justifyContent={'center'} mr={2}>
      <Checkbox
        isChecked={isChecked}
        isIndeterminate={isIndeterminate}
        onChange={handleGlobalCheck}
      />
    </Flex>
    <Text flex={7} fontWeight={'medium'} fontSize={14} mr={2}>
      Nombre
    </Text>
    <Text flex={7} fontWeight={'medium'} fontSize={14} mr={2}>
      Categorías
    </Text>
    <Text flex={12} fontWeight={'medium'} fontSize={14}>
      Etiquetas
    </Text>
  </Flex>
);

export default WorkersTableGuide;
