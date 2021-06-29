import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";

// Components
import CustomImg from "../ui/CustomImg";

const WorkerItem = ({ worker }) => (
  <Flex
    borderRadius={10}
    px={3}
    py={2}
    mt={2}
    alignItems={"center"}
    borderWidth={2}
    borderColor={"darkLight"}
  >
    <Flex alignItems={"center"} justifyContent={"flex-start"} mr={4}>
      <Box
        w={"30px"}
        h={"30px"}
        borderRadius={1000}
        borderWidth={2}
        borderColor={"darkLight"}
        overflow={"hidden"}
      >
        <CustomImg
          h={"100%"}
          w={"100%"}
          image={worker.workerData.images.main}
        />
      </Box>
    </Flex>
    <Text minW={"140px"} fontSize={12} mr={4}>
      {worker.workerData.name}
    </Text>
    {worker.tags.length !== 0 && (
      <Flex flex={1} alignItems={"center"}>
        {worker.tags.map((tag, index) => (
          <Text
            key={index}
            fontSize={12}
            ml={index !== 0 && 1}
            py={1}
            px={2}
            borderRadius={4}
            bg={"darkLight"}
            color={"primary"}
          >
            #{tag.data.name}
          </Text>
        ))}
      </Flex>
    )}
  </Flex>
);

export default WorkerItem;
