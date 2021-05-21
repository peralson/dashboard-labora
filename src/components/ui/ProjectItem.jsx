import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import moment from 'moment'
import 'moment/locale/es'
import SelectList from './SelectList';
import { Image } from '@chakra-ui/image';
import noPicture from '../../assets/svg/noPicture.svg'

const countApplications = offers => {
  let count = 0
  offers.forEach(offer => {
    offer.offerApplications.map(() => count++)
  })
  return count
}

const getApplicationFilter = projectOffers => {
  let filters = []
  projectOffers.forEach(offer => {
    filters.push(offer.offerData.name);
  })
  return filters
}

const getAllApplications = projectOffers => {
  let allApplications = []
  projectOffers.forEach(({ offerApplications }) => {
    offerApplications.forEach(item => {
      allApplications.push(item)
    })
  })
  return allApplications
}

const ProjectItem = ({ projectData, projectOffers }) => {
  const { name, dates, location } = projectData

  const totalApplications = countApplications(projectOffers)
  const allApplications = getAllApplications(projectOffers)

  return (
    <Box w="100%" bg="translucid" borderRadius="10px" p="4">
      <Flex alignItems="flex-start" justifyContent="space-between">
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
        <Box mt={4}>
          <Text fontSize="16px" fontWeight="bold" mb={2}>Ofertas</Text>
          <Flex>
            {projectOffers.map((offer, index) => (
              <Flex
                cursor={"pointer"}
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="space-between"
                key={index}
                minW={'160px'}
                minH={'75px'}
                p={"12px 8px"}
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
                <Text
                  fontSize="12"
                  mt={4}
                  color={offer.offerData.already_assigned !== offer.offerData.qty ? "tomato" : 'green'}
                  borderRadius={4}
                  lineHeight={.5}
                >
                  {offer.offerData.already_assigned !== offer.offerData.qty ? (
                    <>
                      {offer.offerApplications.length === 0 ? (
                        <>
                          {'No tienes solicitudes'}
                        </>
                      ) : (
                        <>
                          {offer.offerApplications.length}
                          {offer.offerApplications.length === 1
                            ? ' solicitud pendiente'
                            : ' solicitudes pendientes'
                          }
                        </>
                      )}
                    </>
                  ) : 'Completo'}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      )}
      {totalApplications !== 0 && (
        <Box mt={4}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize="16px" fontWeight="bold">Solicitudes</Text>
            {projectOffers.length !== 1 && (
              <Box>
                <SelectList
                  fontSize="14px"
                  color="primary"
                  textAlign="left"
                  borderWidth={0}
                  placeholder='Todas'
                  size="xs"
                  values={getApplicationFilter(projectOffers) || []}
                  onChange={() => {}}
                />
              </Box>
            )}
          </Flex>
          <Flex mt={2}>
            {allApplications.map((application, index) => (
              <Box
                cursor={"pointer"}
                key={application.id}
                minW={'160px'}
                p={"12px 8px"}
                bg="translucid"
                borderRadius={4}
                ml={index !== 0 && 2}
              >
                <Flex alignItems="flex-start">
                  {console.log(application.workerData)}
                  <Image
                    w="24px"
                    mr={2}
                    src={
                      application.workerData.images.main.length !== 0
                        ? application.workerData.images.main.length
                        : noPicture
                    }
                    alt={application.workerData.name}
                  />
                  <Box flex="1">
                    <Text>{application.workerData.name}</Text>
                    <Text>{application.workerData.name}</Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ProjectItem;
