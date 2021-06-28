import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image';
import eye from '../../assets/svg/eye.svg'

const Documentation = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex
      alignItems={"center"}
      py={2}
      px={4}
      w={"100%"}
      mb={3}
      borderRadius={10}
      borderColor={"darkLight"}
      borderWidth={2}
    >
      <Text flex={1} fontSize={14} opacity={0.6}>
        ¿Qué puedo hacer aquí?
      </Text>
      <Flex
        onClick={() => setOpen(!open)}
        _hover={{ bg: "primaryLight" }}
        borderRadius={10}
        py={1}
        px={2}
        cursor="pointer"
        opacity={0.6}
      >
        <Text color="primary" fontSize={14}>
          Próximamente
        </Text>
        <Image src={eye} ml={2} w={"15px"} display={"none"} />
      </Flex>
    </Flex>
  );
};

export default Documentation
