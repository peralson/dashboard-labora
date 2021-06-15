import React, { useContext } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { SelectedItemIndie } from '../../context/SelectedItemContext'

const SideSelectorOffer = ({ title, desc, image, ...rest }) => {
  const { selectedItemIndie, setSelectedItemIndie } = useContext(SelectedItemIndie)
  const isActive = selectedItemIndie === title

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      py={3}
      px={4}
      cursor={"pointer"}
      bg={"darkLight"}
      w={"100%"}
      borderRadius={10}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      onClick={() => {
        isActive
          ? setSelectedItemIndie(null)
          : setSelectedItemIndie(title);
      }}
      {...rest}
    >
      <Image src={image} w={"21px"} mr={3} />
      <Box>
        <Text fontSize={14} fontWeight={"bold"}>
          {title}
        </Text>
        {desc && <Text fontSize={12} mt={1}>
          {desc}
        </Text>}
      </Box>
    </Flex>
  );
};
export default SideSelectorOffer;
