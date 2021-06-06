import React, { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { NewProjectOfferContext } from "../../../context/newCreations";
import { validateLegalPayrolls } from "../../../lib/forms/newProjectOfferState";
import Separator from "../../ui/Separator";

// svg
import cancel from "../../../assets/svg/cancel.svg";
import correct from "../../../assets/svg/correct.svg";

const LegalPayrollsValidation = () => {
  const { state } = useContext(NewProjectOfferContext);
  const {
    hasSalary,
    hasExtraSalary,
    hasExtraSalaryOverMin,
    hasSalaryOverMin,
    hasContract,
  } = validateLegalPayrolls(state);
  return (
    <Box>
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Salario
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Introduce un salario por hora
          </Text>
          <Image src={hasSalary ? correct : cancel} w={"12px"} />
        </Flex>
        <Flex
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            El salario es superior a 5,75€/hora
          </Text>
          <Image src={hasSalaryOverMin ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
      <Separator top={4} bottom={4} />
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Horas extra
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Introduce un salario por hora extra
          </Text>
          <Image src={hasExtraSalary ? correct : cancel} w={"12px"} />
        </Flex>
        <Flex
          mt={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Las horas extra son un 10% superior al salario
          </Text>
          <Image src={hasExtraSalaryOverMin ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
      <Separator top={4} bottom={4} />
      <Box>
        <Text fontWeight={"bold"} mb={2}>
          Contrato
        </Text>
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Text fontSize={14} lineHeight={1.6} mr={4}>
            Selecciona un modelo de contrato
          </Text>
          <Image src={hasContract ? correct : cancel} w={"12px"} />
        </Flex>
      </Box>
    </Box>
  );
};

export default LegalPayrollsValidation;
