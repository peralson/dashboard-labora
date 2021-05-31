import React, { useContext } from "react";
import { Flex, Text } from "@chakra-ui/layout";

// Context
import { SelectedItemIndie } from "../../context/SelectedItemContext";

// Components
import CustomImg from './CustomImg'

const OneOfferApplication = ({ application }) => {
  const {
    selectedItemIndie,
    setSelectedItemIndie
  } = useContext(SelectedItemIndie);

  const isActive = selectedItemIndie && selectedItemIndie.id === application.id;

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      cursor={"pointer"}
      border={"1px solid"}
      borderColor={isActive ? "white" : "darkLight"}
      borderRadius={20}
      w={"100%"}
      p={4}
      flexDirection={"column"}
      alignItems={"center"}
      onClick={() => isActive ? setSelectedItemIndie(null) : setSelectedItemIndie(application)} 
    >
      <CustomImg
        image={application.worker.workerData.images.main}
        borderRadius={50}
        border={"2px solid"}
        borderColor={"translucid"}
        alt={application.worker.workerData.name}
        maxH={"62px"}
        maxW={"62px"}
      />
      <Text textAlign={"center"} mt={2} fontSize={16} fontWeight={"bold"}>
        {application.worker.workerData.name}
      </Text>
      {application.worker.tags.length !== 0 && (
        <Flex flexWrap={"wrap"} mt={1} alignItems={"center"}>
          {application.worker.tags.map((tag, index) => (
            <Text
              key={index}
              mt={1}
              mr={1}
              fontSize={12}
              color={"primary"}
              bg={"darkLight"}
              p={1}
              borderRadius={4}
            >
              #{tag}
            </Text>
          ))}
        </Flex>
      )}
      <Text
        w={"100%"}
        mt={4}
        borderRadius={10}
        bg={"translucid"}
        py={1}
        lineHeight={2}
        fontSize={14}
        textAlign={"center"}
        cursor={"pointer"}
        fontWeight={"bold"}
        color={"white"}
        onClick={() => console.log("Aceptado")}
      >
        Aceptar
      </Text>
      <Text
        py={1}
        lineHeight={2}
        fontSize={12}
        textAlign={"center"}
        color={"primary"}
      >
        Ver más
      </Text>
    </Flex>
  );
};

export default OneOfferApplication;
