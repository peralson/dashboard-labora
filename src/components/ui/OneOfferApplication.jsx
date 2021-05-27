import React, { useState, useEffect, useContext } from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { SelectedItemIndie } from "../../context/SelectedItemContext";

const OneOfferApplication = ({ name }) => {
  const { selectedItemIndie, setSelectedItemIndie } =
    useContext(SelectedItemIndie);
  const isActive = selectedItemIndie === name;
  return (
    <Box
      _hover={{ borderColor: "white" }}
      cursor={"pointer"}
      border={"1px solid"}
      borderColor={isActive ? "white" : "darkLight"}
      borderRadius={20}
      w={"100%"}
      py={20}
      onClick={() => {
        isActive ? setSelectedItemIndie(null) : setSelectedItemIndie(name);
      }}
    >
      <Text textAlign={"center"}>{name}</Text>
    </Box>
  );
};

export default OneOfferApplication;
