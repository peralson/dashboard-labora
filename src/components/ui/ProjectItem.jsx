import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { countApplications, getAllApplications, getApplicationFilter } from '../../lib/applications'

// Components
import DateTag from './DateTag';
import OfferItem from './OfferItem';
import SelectList from './SelectList';
import ApplicationItem from './ApplicationItem';

const ProjectItem = ({ projectData, projectOffers }) => {
  const [offerName, setOfferName] = useState(null)
  const { name, dates, location } = projectData

  const totalApplications = countApplications(projectOffers)
  const allApplications = getAllApplications(projectOffers)

  const handleChandleOfferName = event => {
    setOfferName(event.target.value)
  }

  const filteredApplications = allApplications.filter(application => {
    if (offerName) {
      return application.offerName === offerName
    }
    return true
  })

  return (
    <Box bg="darkLight" borderRadius={8} p={"12px 16px"}>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Text fontSize="19px" fontWeight="bold">
            {name ? name : projectOffers[0].offerData.name}
          </Text>
          <Text fontSize="14px" color="primary">
            {location.address.split(',')[0]}
          </Text>
        </Box>
        <DateTag dates={dates} />
      </Flex>
      {name && (
        <Box mt={6}>
          <Text fontSize="16px" fontWeight="bold" mb={2}>Ofertas</Text>
          <Flex>
            {projectOffers.map((offer, index) => (
              <OfferItem offer={offer} index={index} />
            ))}
          </Flex>
        </Box>
      )}
      {totalApplications !== 0 && (
        <Box mt={6}>
          <Flex mb={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize="16px" fontWeight="bold">Solicitudes</Text>
            {projectOffers.length !== 1 && (
              <Box>
                <SelectList
                  fontSize="14px"
                  color="primary"
                  borderWidth={1}
                  borderColor={"transparent"}
                  borderRadius={4}
                  cursor="pointer"
                  placeholder='Todas'
                  _hover={{ borderColor: "primary", borderWidth: 1 }}
                  size="xs"
                  values={getApplicationFilter(projectOffers) || []}
                  onChange={handleChandleOfferName}
                />
              </Box>
            )}
          </Flex>
          <Flex mt={2}>
            {filteredApplications.map((application, index) => (
              <ApplicationItem application={application} index={index} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ProjectItem;
