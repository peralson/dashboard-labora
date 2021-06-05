import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import Separator from "../../../components/ui/Separator";

const PastProjectCard = (props) => {
  const { data } = props;
  const isSelected = false;

  return (
    <Flex
      cursor={"pointer"}
      borderRadius={8}
      p={2}
      pl={2}
      mt={2}
      alignItems={"center"}
      border={"1px solid"}
      borderColor={isSelected ? "white" : "darkLight"}
      _hover={{ borderColor: "white" }}
    >
      <Text flex={2} fontSize={12} mr={2}>
        {data.name}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.direction}
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.workers} trabajos
      </Text>
      <Text flex={1} fontSize={12} mr={2}>
        {data.cost} €
      </Text>
      <Text flex={2} fontSize={12} mr={2}>
        {data.date}
      </Text>
      <Flex flex={1}>
        <Box
          w={"30px"}
          h={"30px"}
          borderRadius={1000}
          border={"2px solid"}
          borderColor="darkLight"
          bg={data.status === "finished" ? "green" : "yellow"}
        ></Box>
      </Flex>
    </Flex>
  );
};

const ManageProjects = (props) => {
  const { data } = props;
  return (
    <>
      <Flex alignItems={"center"} p={2} pl={2} mt={2}>
        <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
          Nombre
        </Text>
        <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
          Lugar
        </Text>
        <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
          Trabajos
        </Text>
        <Text flex={1} mr={2} fontWeight={"medium"} fontSize={14}>
          Coste
        </Text>
        <Text flex={2} mr={2} fontWeight={"medium"} fontSize={14}>
          Fecha
        </Text>
        <Text flex={1} fontWeight={"medium"} fontSize={14}>
          Estado
        </Text>
      </Flex>
      <Separator />
      <Flex w="100%" flexDirection="column">
        {data.map((e) => {
          return <PastProjectCard key={e.id} data={e} />;
        })}
      </Flex>
    </>
  );
};

export default ManageProjects;
