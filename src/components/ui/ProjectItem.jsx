import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import moment from 'moment'
import 'moment/locale/es'

const ProjectItem = ({ projectData, projectOffers }) => {
  const { name, dates, location } = projectData
  return (
    <Box w="100%" bg="translucid" borderRadius="10px" p="4">
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Text color="white">
            {name ? name : projectOffers[0].offerData.name}
          </Text>
          <Text color="grey">
            {location.address.split(',')[0]}
          </Text>
        </Box>
        <Box p='4px 12px' borderRadius={4} bg="darkLight">
          <Text color="white">
            {dates.start._seconds === dates.end._seconds
              ? moment(dates.start._seconds).format('D MMMM')
              : `${moment(dates.start._seconds).format('D MMMM')} - ${moment(dates.end._seconds).format('D MMMM')}`
            }
          </Text>
        </Box>
      </Flex>
      {name && (
        <Box mb={4}>
          <Text flex="1" mb={2}>Puestos de trabajo</Text>
          <Flex flexWrap="nowrap" alignItems="stretch">
            {projectOffers.map((offer, index) => (
              <Box key={index} maxW={200} p={4} bg="translucid" borderRadius={10} ml={index === 0 ? null : 2}>
                <Text>{offer.offerData.name}</Text>
                <Text>{offer.offerData.category}</Text>
                <Text>{offer.offerData.already_assigned} / {offer.offerData.qty}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
      <Flex>
        <Text>Solicitudes</Text>
      </Flex>
    </Box>
  );
};

export default ProjectItem;
