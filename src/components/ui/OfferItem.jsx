import React, { useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { SelectedItem } from '../../context/SelectedItemContext'

const OfferItem = ({ offer, index }) => {
    const { selectedItem, setSelectedItem } = useContext(SelectedItem)
    const isActive = selectedItem
        ? selectedItem.id === offer.id
        : false
    const notComplete = offer.offerData.already_assigned !== parseInt(offer.offerData.qty)
    const totalApplications = offer.offerApplications.length

    return (
      <Flex
        cursor={"pointer"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        key={index}
        minW={180}
        bg={"darkLight"}
        _hover={{ border: "1px solid white", transform: "scale(1.02)" }}
        transform={isActive && "scale(1.02)"}
        p={3}
        pt={4}
        borderRadius={10}
        borderWidth={1}
        borderColor={isActive ? "white" : "translucid"}
        onClick={() => {
          if (isActive) {
            setSelectedItem(null);
          } else {
            setSelectedItem(offer);
          }
        }}
      >
        <Flex alignItems="center" width="100%">
          <Box width="100%" flex="1">
            <Text fontSize={11} color="primary">
              {offer.offerData.category.data.name.toUpperCase()}
            </Text>
            <Text fontSize={14}>{offer.offerData.name}</Text>
          </Box>
          <Text ml={4} fontSize={14} lineHeight={0.5} borderRadius={20}>
            {offer.offerData.already_assigned}/{offer.offerData.qty}
          </Text>
        </Flex>
        <Text
          fontSize={14}
          mt={6}
          color={notComplete ? "red.full" : "green"}
          borderRadius={4}
          lineHeight={1}
          opacity={totalApplications === 0 ? 0 : 1}
        >
          {notComplete ? (
            totalApplications === 0 ? (
              "No tienes solicitudes"
            ) : (
              `${totalApplications} ${
                totalApplications === 1
                  ? " solicitud pendiente"
                  : " solicitudes pendientes"
              }`
            )
          ) : (
            "Completo"
          )}
        </Text>
      </Flex>
    );
}

export default OfferItem
