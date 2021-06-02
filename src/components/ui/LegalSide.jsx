import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import { formattedSalary } from "../../lib/formattedSalary";

// Svg
import download from "../../assets/svg/download.svg";

// Components
import SideTitle from "./SideTitle";
import Separator from "./Separator";
import FlexText from "./FlexText";

const LegalSide = ({ id, salary, extraSalary, extras }) => {
  return (
    <Box>
      <Flex flexDirection={"column"} alignItems={"center"} w={"100%"} mb={4}>
        <Text fontSize={21} fontWeight={"bold"}>
          Contrato
        </Text>
        <Text fontSize={19}>Modelo de azafata</Text>
        <Image
          src={
            "https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg"
          }
          alt={"Previsualización del contrato"}
          maxW={"100px"}
          mb={4}
          mt={2}
          borderRadius={4}
        />
        <Flex
          bg={"translucid"}
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
      <SideTitle>Detalles de la nómina</SideTitle>
      <FlexText left={"Salario"} right={salary} />
      <Separator top={1} bottom={1} />
      <FlexText left={"Horas extra"} right={extraSalary} />
      <Separator top={1} bottom={1} />
      {extras.map(
        (extra, index) =>
          extra.amount > 0 && (
            <Box key={index}>
              {index !== 0 && <Separator top={1} bottom={1} />}
              <FlexText
                left={extra.name}
                right={formattedSalary(extra.amount) + "€"}
              />
            </Box>
          ),
      )}
    </Box>
  );
};

export default LegalSide;
