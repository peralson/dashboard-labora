import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { useHistory } from "react-router-dom";

// lib
import {
  countApplications,
  getAllApplications,
  getApplicationFilter,
  countProjectQtyAndAssigned
} from '../../lib/applications'
import { SelectedItem } from '../../context/SelectedItemContext'

// Components
import DateTag from './DateTag';
import OpenManagementMini from "./OpenManagementMini";
import Remaining from './Remaining';
import OfferItem from './OfferItem';
import SelectList from './SelectList';
import ApplicationItem from './ApplicationItem';

const ProjectItem = ({ id, projectData, projectOffers }) => {
  const { selectedItem } = useContext(SelectedItem)
  const [offerName, setOfferName] = useState('')
  const { name, dates, location } = projectData
  const history = useHistory();

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
    <Box borderWidth={2} borderColor={"darkLight"} borderRadius={20} p={4}>
      <Flex justifyContent={"space-between"} mb={2}>
        <DateTag dates={dates} />
        <OpenManagementMini id={id} />
      </Flex>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex flexDirection={"column"} alignItems={"flex-start"} flex={1}>
          <Flex>
            <Text
              fontSize={21}
              fontWeight="bold"
              cursor={"pointer"}
              onClick={() =>
                history.push(
                  name
                    ? `/ofertas/p/${id}`
                    : `/ofertas/o/${projectOffers[0].id}`,
                )
              }
            >
              {name ? name : projectOffers[0].offerData.name}
            </Text>
          </Flex>
          <Text fontSize={14} color="primary">
            {location.address}
          </Text>
          {!name && (
            <Text
              mt={2}
              fontSize={14}
              px={2}
              py={2}
              lineHeight={1}
              borderRadius={10}
              borderWidth={1}
              borderColor={"accentLight"}
              color={"accent"}
            >
              {projectOffers[0].offerData.category.data.name}
            </Text>
          )}
        </Flex>
        {projectOffers.length !== 0 && (
          <Remaining
            alreadyassigned={alreadyAssigned}
            qty={qty}
            success={"Equipo completo"}
            px={4}
            py={2.5}
            fontSize={16}
            borderRadius={20}
          />
        )}
      </Flex>
      {name && projectOffers.length !== 0 && (
        <Box mt={6}>
          <Text fontWeight={"bold"} lineHeight={2} mb={2}>
            Ofertas
          </Text>
          <Grid w={"100%"} templateColumns={"1fr 1fr 1fr"} gap={4}>
            {projectOffers.map((offer, index) => (
              <OfferItem key={offer.id} offer={offer} index={index} />
            ))}
          </Grid>
        </Box>
      )}
      {totalApplications !== 0 && (
        <Box mt={6}>
          <Flex mb={2} alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"bold"} lineHeight={2}>
              {!offerName
                ? "Todas las solicitudes"
                : `Solicitudes de ${offerName}`}
            </Text>
            {projectOffers.length !== 1 && (
              <Flex>
                {offerName && (
                  <Text
                    cursor={"pointer"}
                    onClick={() => setOfferName("")}
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
                {!offerName && (
                  <SelectList
                    fontSize={14}
                    color="primary"
                    borderWidth={1}
                    borderColor={"primary"}
                    borderRadius={10}
                    cursor="pointer"
                    placeholder="Todas"
                    value={offerName}
                    _hover={{ borderColor: "primary" }}
                    _focus={{ borderColor: "primary" }}
                    values={getApplicationFilter(projectOffers) || []}
                    onChange={handleChandleOfferName}
                  />
                )}
              </Flex>
            )}
          </Flex>
          <Grid w={"100%"} templateColumns={"1fr 1fr 1fr"} gap={4}>
            {filteredApplications.map((application, index) => (
              <ApplicationItem
                key={application.id}
                application={application}
                index={index}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ProjectItem;
