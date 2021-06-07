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
    <Flex flex={2} alignItems={"center"} justifyContent={"flex-start"} mr={2}>
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
    <Text flex={12} fontSize={12}>
      {worker.workerData.name}
    </Text>
    <Text flex={4} fontSize={12} mr={2} textAlign={"right"}>
      {worker.workerData.contact.phoneNumber}
    </Text>
  </Flex>
);

export default WorkerItem;
