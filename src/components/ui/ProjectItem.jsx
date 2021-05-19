import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import moment from 'moment'
import 'moment/locale/es'

const ProjectItem = ({ projectData, projectOffers }) => {
  const { name, dates, location } = projectData
  console.log(projectOffers[0]);
  return (
    <Box w="100%" bg="translucid" borderRadius="10px" p="4">
      <Flex alignItems="flex-start" justifyContent="space-between" mb={4}>
        <Box>
          <Text fontSize="19px" fontWeight="bold">
            {name ? name : projectOffers[0].offerData.name}
          </Text>
          <Text fontSize="12px" color="primary">
            {location.address.split(',')[0]}
          </Text>
        </Box>
        <Text
          p='4px 8px'
          fontWeight="bold"
          borderRadius={4}
          bg="darkLight"
          fontSize="12px"
        >
          {dates.start._seconds === dates.end._seconds
            ? moment(dates.start._seconds).format('D MMMM')
            : `${moment(dates.start._seconds).format('D MMMM')} - ${moment(dates.end._seconds).format('D MMMM')}`
          }
        </Text>
      </Flex>
      {name && (
        <Box mb={4}>
          <Text fontSize="16px" fontWeight="bold" mb={2}>Ofertas</Text>
          <Flex flexWrap="nowrap" alignItems="stretch">
            {projectOffers.map((offer, index) => (
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-between"
                key={index}
                minW={'160px'}
                minH={'75px'}
                pt={3}
                pb={3}
                pl={2}
                pr={2}
                bg="translucid"
                borderRadius={4}
                ml={index !== 0 && 2}
              >
                <Flex alignItems="center" width="100%">
                  <Box width="100%" flex="1">
                    <Text fontSize="10" color="primary" lineHeight=".5">
                      {offer.offerData.category.toUpperCase()}
                    </Text>
                    <Text fontSize="14" mt={2.5} lineHeight=".5">{offer.offerData.name}</Text>
                  </Box>
                  <Text
                    ml={4}
                    fontSize="14"
                    p="4px 6px"
                    lineHeight={1}
                    borderRadius={20}
                  >
                    {offer.offerData.already_assigned}/{offer.offerData.qty}
                  </Text>
                </Flex>
                {offer.offerApplications.length !== 0 && (
                  <Text
                    fontSize="12"
                    mt={4}
                    color={offer.offerData.already_assigned !== offer.offerData.qty ? "tomato" : 'green'}
                    borderRadius={4}
                    lineHeight={.5}
                  >
                    {offer.offerData.already_assigned !== offer.offerData.qty ? (
                      <>
                        {offer.offerApplications.length}
                        {offer.offerApplications.length === 1 
                          ? ' solicitud pendiente'
                          : ' solicitudes pendientes'
                        }
                      </>
                    ) : 'Completo'}
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
      )}
      <Flex>
        <Text fontSize="16px" fontWeight="bold" mb={2}>Solicitudes</Text>
      </Flex>
    </Box>
  );
};

export default ProjectItem;
