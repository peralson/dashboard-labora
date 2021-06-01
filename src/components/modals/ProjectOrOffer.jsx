import React from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/image";
import next from "../../assets/svg/next.svg";

const ProjectOrOffer = () => {
  return (
    <Box>
      <Link to={`../ofertas/nuevaOferta/`}>
        <Flex
          mb={2}
          py={2}
          px={4}
          borderWidth={1}
          borderColor={"translucid"}
          _hover={{ borderColor: "white" }}
          cursor={"pointer"}
          borderRadius={10}
          alignItems={"center"}
        >
          <Box flex={1}>
            <Text fontWeight={"bold"}>Oferta</Text>
            <Text fontSize={14}>Una oferta individual</Text>
          </Box>
          <Flex ml={2} alignItems={"center"}>
            <Text fontSize={14} color={"primary"} mr={1.5}>
              Crear
            </Text>
            <Image src={next} alt={"Crear"} w={"12px"} />
          </Flex>
        </Flex>
      </Link>
      <Link to={`../ofertas/nuevoProyecto/`}>
        <Flex
          py={2}
          px={4}
          borderWidth={1}
          borderColor={"translucid"}
          _hover={{ borderColor: "white" }}
          cursor={"pointer"}
          borderRadius={10}
          alignItems={"center"}
        >
          <Box flex={1}>
            <Text fontWeight={"bold"}>Proyecto</Text>
            <Text fontSize={14}>
              Un número ilimitado de ofertas relacionadas
            </Text>
            <Text mt={2} fontSize={14} color={"accent"}>
              Selección más popular
            </Text>
          </Box>
          <Flex ml={2} alignItems={"center"}>
            <Text fontSize={14} color={"primary"} mr={1.5}>
              Crear
            </Text>
            <Image src={next} alt={"Crear"} w={"12px"} />
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export default ProjectOrOffer;
