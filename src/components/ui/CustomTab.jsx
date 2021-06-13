import React from 'react';
import { Text } from '@chakra-ui/layout'

const CustomTab = ({ selectedTab, onClick, children, ...rest }) => (
    <Text
      py={2}
      px={4}
      mr={2}
      cursor={'pointer'}
      onClick={onClick}
      borderWidth={2}
      borderColor={selectedTab === children ? "white" : "darkLight"}
      borderRadius={10}
      _hover={{ borderColor: "white" }}
      {...rest}
    >
      {children}
    </Text>
  );

export default CustomTab
