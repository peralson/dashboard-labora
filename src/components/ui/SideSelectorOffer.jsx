import React, { useContext } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { SelectedItemIndie } from '../../context/SelectedItemContext'

const SideSelectorOffer = (props) => {
  const { selectedItemIndie, setSelectedItemIndie } = useContext(SelectedItemIndie)
  const isActive = selectedItemIndie === props.title

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      flexDirection={"column"}
      py={4}
      px={2}
      cursor={"pointer"}
      w={"100%"}
      bg={"darkLight"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={10}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      onClick={() => {
        isActive
          ? setSelectedItemIndie(null)
          : setSelectedItemIndie(props.title);
      }}
      {...props}
    >
      <Image src={props.image} w={"32px"} mb={4} />
      <Text
        textAlign={"center"}
        fontSize={18}
        lineHeight={1}
        fontWeight={"bold"}
      >
        {props.title}
      </Text>
      <Text textAlign={"center"} fontSize={14} lineHeight={1.5} mt={1.5}>
        {props.desc}
      </Text>
    </Flex>
  );
};
export default SideSelectorOffer;
