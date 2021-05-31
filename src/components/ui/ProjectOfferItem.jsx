import React, { useContext } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";

import { SelectedProject } from "../../context/SelectedItemContext";

const ProjectOfferItem = ({ offer }) => {
  const { selectedItemIndie, setSelectedItemIndie } =
    useContext(SelectedProject);
  const isActive = selectedItemIndie ? selectedItemIndie === offer : false;

  return (
    <Flex
      cursor={"pointer"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      _hover={{ borderColor: "white", transform: "scale(1.02)" }}
      transform={isActive && "scale(1.02)"}
      px={3}
      py={4}
      borderRadius={10}
      border={"1px solid"}
      borderColor={isActive ? "white" : "darkLight"}
      onClick={() => {
        if (isActive) {
          setSelectedItemIndie(null);
        } else {
          setSelectedItemIndie(offer);
        }
      }}
    >
      <Flex alignItems="center" width="100%">
        <Box width="100%" flex="1">
          <Text fontSize={14} color="primary" lineHeight={1}>
            {offer.offerData.category.toUpperCase()}
          </Text>
          <Text fontSize={16} mt={1} lineHeight={1}>
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
};

export default ProjectOfferItem;
