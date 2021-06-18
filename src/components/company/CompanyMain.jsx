import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";

// Components
import CustomImg from "../ui/CustomImg";

const CompanyMain = ({ general, contact }) => {
  const { name, photo } = general;
  const { location } = contact;
  return (
    <Box
      p={4}
      borderRadius={10}
      bg={"darkLight"}
      borderWidth={1}
      borderColor={"translucid"}
    >
      <Flex alignItems={"center"} w={"100%"}>
        <Box h={"80px"} w={"80px"} borderRadius={"50%"} overflow={"hidden"}>
          <CustomImg image={photo} alt={name} h={"100%"} mx={"auto"} />
        </Box>
        <Box ml={4}>
          <Text fontSize={21} fontWeight={"bold"}>
            {name}
          </Text>
          <Text fontSize={12} mt={1} color={"grey.dark"}>
            {location.address}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CompanyMain;
