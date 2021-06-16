import React, { useState, useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";

import {
  SelectedItemManage,
  SelectedManageSide,
} from '../../context/SelectedItemContext';

const PastProjectOfferItem = ({ offer }) => {
  const { selectedItemManage, setSelectedItemManage } =
    useContext(SelectedItemManage);
  const { setSelectedManageSide } = useContext(SelectedManageSide);
  const isActive = selectedItemManage ? selectedItemManage === offer : false;

  return (
    <Flex
      cursor={"pointer"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      _hover={{ borderColor: "white", transform: "scale(1.02)" }}
      transform={isActive && "scale(1.02)"}
      bg={"darkLight"}
      px={3}
      py={4}
      borderRadius={10}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      onClick={() => {
        if (isActive) {
          setSelectedItemManage(null);
          setSelectedManageSide(null);
        } else {
          setSelectedItemManage(offer);
          setSelectedManageSide('OfertaPasada');
        }
      }}
    >
      <Flex alignItems="center" width="100%">
        <Box width="100%" flex="1">
          <Text fontSize={14} color="primary">
            {offer.offerData.category.toUpperCase()}
          </Text>
          <Text fontSize={16} mt={1}>
            {offer.offerData.name}
          </Text>
        </Box>
        <Text ml={4} fontSize={16} lineHeight={0.5} borderRadius={20}>
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
        {/* {offer.offerData.already_assigned !== offer.offerData.qty ? (
          <>
            {offer.offerApplications.length === 0 ? (
              <Text opacity={0}>{"No tienes solicitudes"}</Text>
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
        )} */}
      </Text>
    </Flex>
  );
};

export default PastProjectOfferItem;
