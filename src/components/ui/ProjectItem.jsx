import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

// lib
import {
  countApplications,
  getAllApplications,
  getApplicationFilter,
  countProjectQtyAndAssigned
} from '../../lib/applications'
import { SelectedItem } from '../../context/SelectedItemContext'

// Components
import Menu from '../../assets/svg/ellypsis-vertical.svg'
import DateTag from './DateTag';
import OfferItem from './OfferItem';
import SelectList from './SelectList';
import ApplicationItem from './ApplicationItem';

const ProjectItem = ({ projectData, projectOffers }) => {
  const { selectedItem } = useContext(SelectedItem)
  const [offerName, setOfferName] = useState('')
  const { name, dates, location } = projectData

  const totalApplications = countApplications(projectOffers)
  const allApplications = getAllApplications(projectOffers)
  const { qty, alreadyAssigned } = countProjectQtyAndAssigned(projectOffers);

  useEffect(() => {
    if (!!selectedItem) {
      projectOffers.forEach(offer => {
        if (offer.id === selectedItem.id) {
          setOfferName(selectedItem.offerData.name)
        }
      })
    } else {
      setOfferName('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const handleChandleOfferName = event => {
    setOfferName(event.target.value)
  }

  const filteredApplications = allApplications
    .filter(application => {
      if (offerName) {
        return application.offerName === offerName
      }
      return true
    }
  )

  return (
    <Box bg="darkLight" borderRadius={8} py={3} px={4}>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <DateTag dates={dates} />
        <Flex
          alignItems="center"
          borderRadius={50}
          _hover={{ background: "translucid" }}
          px={3}
          py={2}
          cursor="pointer"
        >
          <Image src={Menu} alt={"Opciones"} h={3} />
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize={21} fontWeight="bold">
            {name ? name : projectOffers[0].offerData.name}
          </Text>
          <Text fontSize={14} color="primary">
            {location.address.split(',')[0]}
          </Text>
        </Box>
        {alreadyAssigned/qty === 1 ? (
          <Text lineHeight={1} bg={"translucid"} px={4} py={2.5} borderRadius={20} fontSize={16}>
            Equipo completo
          </Text>
        ) : (
          <Text lineHeight={1} bg={"red.smooth"} px={4} py={2.5} borderRadius={20} fontSize={16} fontWeight={"bold"} color={"red.full"}>
            {alreadyAssigned} / {qty}
          </Text>
        )}
      </Flex>
      {name && (
        <Box mt={6}>
          <Text fontSize={18} fontWeight="bold" lineHeight={2} mb={2}>Ofertas</Text>
          <Flex>
            {projectOffers.map((offer, index) => (
              <OfferItem key={offer.id} offer={offer} index={index} />
            ))}
          </Flex>
        </Box>
      )}
      {totalApplications !== 0 && (
        <Box mt={6}>
          <Flex mb={2} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={18} fontWeight="bold" lineHeight={2}>Solicitudes</Text>
            {projectOffers.length !== 1 && (
              <Flex>
                {offerName && (
                  <Text
                    cursor={"pointer"}
                    onClick={() => setOfferName('')}
                    fontSize={14}
                    color={"grey.dark"}
                    borderWidth={1}
                    borderColor={"grey.dark"}
                    borderRadius={10}
                    px={4}
                    py={2}
                    mr={2}
                    alignContent={"center"}
                  >
                    Deshacer
                  </Text>
                )}
                <SelectList
                    fontSize={14}
                    color="primary"
                    borderWidth={1}
                    borderColor={"primary"}
                    borderRadius={10}
                    cursor="pointer"
                    placeholder='Todas'
                    value={offerName}
                    _hover={{ borderColor: "primary" }}
                    _focus={{ borderColor: "primary" }}
                    values={getApplicationFilter(projectOffers) || []}
                    onChange={handleChandleOfferName}
                  /> 
              </Flex>
            )}
          </Flex>
          <Flex mt={2}>
            {filteredApplications.map((application, index) => (
              <ApplicationItem key={application.id} application={application} index={index} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ProjectItem;
