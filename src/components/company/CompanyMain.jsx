import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom'

// Components
import CustomImg from "../ui/CustomImg";

const CompanyMain = ({ general, contact }) => {
  const { name, photo } = general;
  const { location } = contact;
  const history = useHistory()

  return (
    <Box
      mb={6}
      py={4}
      px={5}
      borderRadius={10}
      bg={"darkLight"}
      borderWidth={1}
      borderColor={"translucid"}
    >
      <Flex alignItems={"center"} w={"100%"}>
        <Box h={"72px"} w={"72px"} borderRadius={"50%"} overflow={"hidden"}>
          <CustomImg image={photo} alt={name} h={"100%"} mx={"auto"} />
        </Box>
        <Flex flex={1} ml={4} justifyContent={"space-between"}>
          <Box flex={1} mr={2}>
            <Text fontSize={21} fontWeight={"bold"}>
              {name}
            </Text>
            <Text fontSize={14} mt={1} color={"grey.dark"} isTruncated>
              {location.address}
            </Text>
          </Box>
          <Box>
            <Text 
              onClick={() => history.push('/empresa/editar')}
              fontSize={14}
              cursor={"pointer"}
              borderRadius={8}
              color={"primary"}
              py={1}
              px={2}
              _hover={{ bg: "primaryLight" }}
            >
              Editar
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CompanyMain;
