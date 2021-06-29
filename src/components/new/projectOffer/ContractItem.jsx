import React, { useContext } from "react";
import { Text, Flex, Image } from "@chakra-ui/react";

// Custom
import { NewProjectOfferContext } from "../../../context/newCreations";

// Svg
import eye from "../../../assets/svg/eye.svg";

const ContractItem = ({ id, name, file }) => {
  const { state, dispatch } = useContext(NewProjectOfferContext);

  const isActive = state.contractId === id;

  return (
    <Flex
      _hover={{ borderColor: "white" }}
      cursor={"pointer"}
      borderWidth={1}
      bg={"darkLight"}
      borderColor={isActive ? "white" : "translucid"}
      borderRadius={20}
      w={"100%"}
      p={4}
      flexDirection={"column"}
      alignItems={"center"}
      onClick={() => {
        dispatch({ type: "setContract", payload: id });
      }}
    >
      <Text textAlign={"center"} fontSize={14} fontWeight={"bold"}>
        Modelo {name}
      </Text>
      <Image
        src={"https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg"}
        alt={"Previsualización del contrato"}
        maxW={"80px"}
        mb={4}
        mt={3}
        borderRadius={4}
      />
      <a
        href={file}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Flex
          bg={"translucid"}
          py={1.5}
          px={3}
          cursor={"pointer"}
          borderRadius={10}
          alignItems={"center"}
        >
          <Image src={eye} alt={"Descargar contrato"} w={"10px"} />
          <Text ml={2} color={"primary"} fontSize={12}>
            Ver contrato
          </Text>
        </Flex>
      </a>
    </Flex>
  );
};

export default ContractItem;
