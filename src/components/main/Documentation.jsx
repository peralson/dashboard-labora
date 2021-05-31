import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image';
import eye from '../../assets/svg/eye.svg'

const Documentation = ({ content }) => {
	const [open, setOpen] = useState(false)
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
      <Text flex={1} color="white">
        ¿Qué puedo hacer aquí?
      </Text>
      <Flex
        onClick={() => setOpen(!open)}
        _hover={{ background: "translucid" }}
        bg={open && "translucid"}
        borderRadius={10}
        py={1}
        px={2}
        cursor="pointer"
      >
        <Text color="primary" fontSize={14}>
          Ver
        </Text>
        <Image src={eye} ml={2} w={"15px"} />
      </Flex>
    </Flex>
  );
}

export default Documentation
