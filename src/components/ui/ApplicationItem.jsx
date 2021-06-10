import React, { useContext } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { SelectedItem } from '../../context/SelectedItemContext'
import CustomImg from "./CustomImg";

const ApplicationItem = ({ application }) => {
  const { selectedItem, setSelectedItem } = useContext(SelectedItem);
  const isActive = selectedItem ? selectedItem.id === application.id : false;

  return (
    <Box
      cursor={"pointer"}
      _hover={{ borderWidth: 1, transform: "scale(1.02)" }}
      transform={isActive && "scale(1.02)"}
      bg={"darkLight"}
      p={3}
      pt={4}
      borderRadius={10}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      onClick={() => setSelectedItem(application)}
    >
      <Flex alignItems="center">
        <CustomImg
          w={"32px"}
          h={"32px"}
          borderRadius={15}
          borderWidth={2}
          borderColor={"darkLight"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          mr={2}
          image={application.worker.workerData.images.main}
          alt={application.worker.workerData.name}
        />
        <Box flex={1}>
          <Text fontSize={11} color="primary">
            {application.offerName.toUpperCase()}
          </Text>
          <Text fontSize={14}>{application.worker.workerData.name}</Text>
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
};

export default ApplicationItem
