import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";

import { SelectedWorker } from "../../context/SelectedItemContext";

import check from "../../assets/svg/check.svg";
import CustomImg from "./CustomImg";

const WorkerListItem = ({ worker, handleCheck, checkedItems }) => {
  const { selectedWorker, setSelectedWorker } = useContext(SelectedWorker);
  const isSelected = selectedWorker && worker.id === selectedWorker.id;

  return (
    <Flex
      cursor={"pointer"}
      borderRadius={20}
      py={4}
      px={2}
      bg={"darkLight"}
      alignItems={"center"}
      flexDir={"column"}
      borderWidth={2}
      borderColor={isSelected ? "white" : "translucid"}
      _hover={{ borderColor: "white" }}
      onClick={() => {
        if (isSelected) {
          return setSelectedWorker(null);
        }
        return setSelectedWorker(worker);
      }}
    >
      <Flex flex={2} alignItems={"center"} justifyContent={"center"} mr={2}>
        <Box
          w={"50px"}
          h={"50px"}
          borderRadius={1000}
          borderWidth={2}
          onClick={() => handleCheck(worker)}
          borderColor={checkedItems.includes(worker.id) ? "white" : "darkLight"}
          overflow={"hidden"}
        >
          {checkedItems.includes(worker) ? (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"primary"}
              h={"100%"}
              w={"100%"}
            >
              <CustomImg h={"40%"} w={"50%"} image={check} />
            </Flex>
          ) : (
            <CustomImg
              h={"100%"}
              w={"100%"}
              image={worker.workerData.images.main}
            />
          )}
        </Box>
      </Flex>
      <Text
        fontSize={14}
        fontWeight={"bold"}
        mt={2}
        mb={1}
        textAlign={"center"}
      >
        {worker.workerData.name}
      </Text>
      {worker.categories.length > 0 && (
        <Flex mt={1} flexWrap={"wrap"} justifyContent={"center"}>
          {worker.categories.slice(0, 2).map((category, index) => (
            <Text
              key={index}
              mt={1}
              ml={index !== 0 && 1}
              color={"accent"}
              bg={"dark"}
              py={1}
              px={2}
              borderRadius={4}
              fontSize={11}
            >
              {category.data.name}
            </Text>
          ))}
          {worker.categories.length > 2 && (
            <Text
              mt={1}
              ml={1}
              color={"accent"}
              bg={"dark"}
              py={1}
              px={2}
              borderRadius={4}
              fontSize={11}
            >
              ...
            </Text>
          )}
        </Flex>
      )}
      {worker.tags.length > 0 && (
        <Flex mt={2} flexWrap={"wrap"} justifyContent={"center"}>
          {worker.tags.slice(0, 3).map((tag, index) => (
            <Text
              mt={1}
              key={index}
              ml={index !== 0 && 2}
              color={"primary"}
              fontSize={12}
            >
              #{tag.data.name}
            </Text>
          ))}
          {worker.tags.length > 2 && (
            <Text mt={1} ml={2} color={"primary"} fontSize={12}>
              ...
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default WorkerListItem;
