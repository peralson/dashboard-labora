import React from "react";
import { Flex, Box, Text, Image } from "@chakra-ui/react";

// Svg
import download from "../../assets/svg/download.svg";
import eye from "../../assets/svg/eye.svg";

const LegalSide = ({ id, model }) => (
  <Box>
    <Flex flexDirection={"column"} alignItems={"center"} w={"100%"} mb={4}>
      <Text fontSize={21} fontWeight={"bold"}>
        Contrato
      </Text>
      <Text fontSize={19}>{model} {id}</Text> 
      <Image
        src="https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg"
        alt={"Previsualización del contrato"}
        maxW={"100px"}
        mb={4}
        mt={2}
        borderRadius={4}
      />
      <Flex>
        <Flex
          bg={"darkLight"}
          mr={2}
          py={2}
          px={4}
          cursor={"pointer"}
          borderRadius={10}
          alignItems={"center"}
        >
          <Image src={eye} alt={"Ver contrato"} w={"12px"} />
          <Text ml={2} color={"primary"} fontSize={14}>
            Ver
          </Text>
        </Flex>
        <Flex
          bg={"darkLight"}
          py={2}
          px={4}
          cursor={"pointer"}
          borderRadius={10}
          alignItems={"center"}
        >
          <Image src={download} alt={"Descargar contrato"} w={"12px"} />
          <Text ml={2} color={"primary"} fontSize={14}>
            Descargar
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Box>
);

export default LegalSide;
