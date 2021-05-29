import React from 'react';
import { Box } from '@chakra-ui/layout'

const CustomTab = (props) => {
  return (
    <Box
      w='auto'
      h='auto'
      py={2}
      px={3}
      mr={4}
      cursor='pointer'
      bg={props.active ? 'translucid' : 'darkLight'}
      {...props}
      color='white'
      borderRadius={8}
      onClick={props.onClick}
    >
      {props.title}
    </Box>
  );
};

export default CustomTab
