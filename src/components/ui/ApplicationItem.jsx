import React, { useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { SelectedItem } from '../../context/SelectedItemContext'
import CustomImg from "./CustomImg";

const ApplicationItem = ({ application, index }) => {
    const { selectedItem, setSelectedItem } = useContext(SelectedItem)
    const isActive = selectedItem
        ? selectedItem.id === application.id
        : false

    return (
      <Box
        cursor={"pointer"}
        _hover={{ border: "1px solid white", transform: "scale(1.02)" }}
        transform={isActive && "scale(1.02)"}
        p={3}
        pt={4}
        borderRadius={10}
        ml={index !== 0 && 2}
        border={"1px solid"}
        borderColor={isActive ? "white" : "darkLight"}
        onClick={() => setSelectedItem(application)}
      >
        <Flex alignItems="center">
          <CustomImg
            w={7}
            h={7}
            borderRadius={15}
            border={"1px solid"}
            borderColor={"darkLight"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            mr={2}
            image={application.worker.workerData.images.main}
            alt={application.worker.workerData.name}
          />
          <Box flex="1">
            <Text fontSize={12} color="primary" lineHeight={1}>
              {application.offerName.toUpperCase()}
            </Text>
            <Text fontSize={14} lineHeight={1} mt={1}>
              {application.worker.workerData.name}
            </Text>
          </Box>
        </Flex>
        <Flex mt={5}>
          <Text
            flex={1}
            borderRadius={10}
            bg={"translucid"}
            py={1}
            lineHeight={2}
            fontSize={14}
            textAlign={"center"}
            cursor={"pointer"}
            fontWeight={"bold"}
            color={"white"}
            onClick={() => console.log("Aceptado")}
          >
            Aceptar
          </Text>
          <Text
            flex={1}
            py={1}
            lineHeight={2}
            fontSize={14}
            textAlign={"center"}
            color={"primary"}
          >
            Ver más
          </Text>
        </Flex>
      </Box>
    );
}

export default ApplicationItem
