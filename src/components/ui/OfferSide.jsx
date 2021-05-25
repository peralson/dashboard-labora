import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { Link } from "react-router-dom";
import { formattedSalary } from "../../lib/formattedSalary";

// Components
import Separator from "./Separator";
import ScheduleDropdown from "./ScheduleDropdown";

const OfferSide = ({ data }) => {
  const { id, offerData } = data;

  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Text fontSize={12} lineHeight={1.5} color={"primary"}>
            {offerData.category.toUpperCase()}
          </Text>
          <Text fontSize={19} fontWeight={"bold"} lineHeight={1.5}>
            {offerData.name}
          </Text>
        </Box>
        {offerData.alreadyAssigned / offerData.qty === 1 ? (
          <Text
            lineHeight={1}
            bg={"translucid"}
            px={3}
            py={2}
            borderRadius={"20"}
            fontSize={"14px"}
          >
            Oferta completa
          </Text>
        ) : (
          <Text
            lineHeight={1}
            bg={"red.smooth"}
            px={3}
            py={2}
            borderRadius={"20"}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"red.full"}
          >
            {offerData.already_assigned} / {offerData.qty}
          </Text>
        )}
      </Flex>
      <Link to={`/ofertas/o/${id}`}>
        <Text
          m={4}
          lineHeight={2}
          textAlign={"center"}
          borderRadius={10}
          py={1}
          fontSize={14}
          fontWeight={"bold"}
          bg={"translucid"}
        >
          Ver todo sobre esta oferta
        </Text>
      </Link>
      <Box mb={4}>
        <Text flex={1} fontSize={16} lineHeight={2} fontWeight="bold" mb={2}>
          Horario
        </Text>
        <Flex flexDirection={"column"}>
          {offerData.schedule.map((sche, index) => (
            <ScheduleDropdown key={index} sche={sche} />
          ))}
        </Flex>
      </Box>
      <Text flex={1} fontSize={16} lineHeight={2} fontWeight="bold" mb={2}>
        Más información
      </Text>
      <Flex>
        <Text flex={1} fontSize={14} lineHeight={2} fontWeight="bold">
          Salario
        </Text>
        <Text lineHeight={2} fontSize={14}>
          {formattedSalary(offerData.salary)}€
        </Text>
      </Flex>
      <Separator top={1} bottom={1} />
      <Flex>
        <Text flex={1} fontSize={14} lineHeight={2} fontWeight="bold">
          Horas extra
        </Text>
        <Text lineHeight={2} fontSize={14}>
          {formattedSalary(offerData.extraSalary)}€
        </Text>
      </Flex>
      <Separator top={1} bottom={1} />
      {offerData.extras.map(
        (extra, index) =>
          extra.amount > 0 && (
            <Box key={index}>
              {index !== 0 && <Separator top={1} bottom={1} />}
              <Flex>
                <Text flex={1} fontSize={14} lineHeight={2} fontWeight="bold">
                  {extra.name}
                </Text>
                <Text lineHeight={2} fontSize={14}>
                  {formattedSalary(extra.amount)}€
                </Text>
              </Flex>
            </Box>
          ),
      )}
      {offerData.description && (
        <>
          <Separator top={1} bottom={1} />
          <Text mb={1} fontSize={14} lineHeight={2} fontWeight="bold">
            Requisitos
          </Text>
          <Text lineHeight={1.7} fontSize={14}>
            {offerData.description}
          </Text>
        </>
      )}
    </Box>
  );
};

export default OfferSide;
