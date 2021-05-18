import React from 'react';
import { Box, Text } from '@chakra-ui/layout';

const MultiOfferProject = ({ key, projectData, projectOffers }) => {
  return (
    <Box w="100%" h="400px" bg="translucid" borderRadius="10px" p="6">
      <Text color="white">{projectData.name}</Text>
    </Box>
  );
};

export default MultiOfferProject;
