import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";

const TopHeaderBar = ({ history, children, onEdit }) => (
  <Flex alignItems={"center"} justifyContent={"space-evenly"}>
    <Box maxW={"100%"}>
      <Flex
        justifyContent={"flex-end"}
        _hover={{ background: "translucid" }}
        px={2.5}
        py={2}
        borderRadius={10}
        cursor={"pointer"}
        onClick={() => history.goBack()}
      >
        <Image src={back} mr={2} w={"14px"} />
        <Text fontSize={16} color={"primary"}>
          Volver
        </Text>
      </Flex>
    </Box>
    <Text
      flex={1}
      fontSize={19}
      lineHeight={2}
      fontWeight={"bold"}
      textAlign={"center"}
    >
      {children}
    </Text>
    <Box maxW={"100%"}>
      <Flex
        justifyContent={"flex-end"}
        _hover={{ background: "translucid" }}
        px={2.5}
        py={2}
        borderRadius={10}
        cursor={"pointer"}
        onClick={onEdit}
      >
        <Text fontSize={16} color={"primary"}>
          Editar
        </Text>
        <Image src={edit} ml={2} w={"14px"} />
      </Flex>
    </Box>
  </Flex>
);

export default TopHeaderBar;
