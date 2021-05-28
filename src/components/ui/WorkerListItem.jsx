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
      borderRadius={8}
      p={2}
      pl={0}
      mt={2}
      alignItems={"center"}
      border={"1px solid"}
      borderColor={isSelected ? "white" : "darkLight"}
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
          w={"30px"}
          h={"30px"}
          borderRadius={1000}
          border={"2px solid"}
          onClick={() => handleCheck(worker.id)}
          borderColor={checkedItems.includes(worker.id) ? "white" : "darkLight"}
          overflow={"hidden"}
        >
          {checkedItems.includes(worker.id) ? (
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
      <Text flex={7} fontSize={12} mr={2}>
        {worker.workerData.name}
      </Text>
      <Box flex={7} mr={2}>
        {worker.categories.length > 0 && (
          <Flex>
            {worker.categories.map((category, index) => (
              <Text
                key={index}
                ml={index !== 0 && 1}
                color={"accent"}
                bg={"darkLight"}
                py={1}
                px={2}
                borderRadius={4}
                fontSize={12}
              >
                {category}
              </Text>
            ))}
          </Flex>
        )}
      </Box>
      <Box flex={12}>
        {worker.tags.length > 0 && (
          <Flex>
            {worker.tags.map((tag, index) => (
              <Text
                key={index}
                ml={index !== 0 && 1}
                color={"primary"}
                bg={"darkLight"}
                py={1}
                px={2}
                borderRadius={4}
                fontSize={12}
              >
                {tag}
              </Text>
            ))}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default WorkerListItem;
