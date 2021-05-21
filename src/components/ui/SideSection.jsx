import React from 'react';

// Chakra
import { Box, Flex, Text } from '@chakra-ui/layout';

// Icon
import {
  MdKeyboardArrowRight,
} from 'react-icons/md';

function SideSection({ title, type, children, onClick }) {
  return (
    <Box
      p='2'
      borderRadius='4px'
      bg='translucid'
      flexDirection='column'
      mb='15px'
      cursor={onClick ? 'pointer' : 'auto'}
    >
      <Flex flexDirection='row' w='100%' justifyContent='space-between'>
        <Text mb='10px'>{title}</Text>
        {onClick && <MdKeyboardArrowRight onClick={onClick}/>}
      </Flex>
      {type === 'wrap' ? (
        <Flex wrap='wrap'>{children}</Flex>
      ) : (
        <Flex flexDirection='column'>{children}</Flex>
      )}
    </Box>
  );
}

export default SideSection;
