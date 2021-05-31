import React, { useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { SelectedItem } from '../../context/SelectedItemContext'

const OfferItem = ({ offer, index }) => {
    const { selectedItem, setSelectedItem } = useContext(SelectedItem)
    const isActive = selectedItem
        ? selectedItem.id === offer.id
        : false

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
        ml={index !== 0 && 2}
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
            <Text fontSize={12} color="primary" lineHeight={1}>
              {offer.offerData.category.toUpperCase()}
            </Text>
            <Text fontSize={14} mt={1} lineHeight={1}>
              {offer.offerData.name}
            </Text>
          </Box>
          <Text ml={4} fontSize={14} lineHeight={0.5} borderRadius={20}>
            {offer.offerData.already_assigned}/{offer.offerData.qty}
          </Text>
        </Flex>
        <Text
          fontSize={14}
          mt={6}
          color={
            offer.offerData.already_assigned !== offer.offerData.qty
              ? "red.full"
              : "green"
          }
          borderRadius={4}
          lineHeight={1}
        >
          {offer.offerData.already_assigned !== offer.offerData.qty ? (
            <>
              {offer.offerApplications.length === 0 ? (
                <>{"No tienes solicitudes"}</>
              ) : (
                <>
                  {offer.offerApplications.length}
                  {offer.offerApplications.length === 1
                    ? " solicitud pendiente"
                    : " solicitudes pendientes"}
                </>
              )}
            </>
          ) : (
            "Completo"
          )}
        </Text>
      </Flex>
    );
}

export default OfferItem
