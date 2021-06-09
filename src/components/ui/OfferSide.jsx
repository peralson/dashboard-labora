import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { Link } from "react-router-dom";
import { formattedSalary } from "../../lib/formattedSalary";

// Components
import Separator from "./Separator";
import FlexText from "./FlexText";
import SideTitle from "./SideTitle";
import Remaining from "./Remaining";
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
        <Remaining
          alreadyassigned={offerData.already_assigned}
          qty={offerData.qty}
          success={"Completa"}
          px={3}
          py={2}
          fontSize={14}
          borderRadius={20}
        />
      </Flex>
      <Link to={`/ofertas/o/${id}`}>
        <Text
          mt={4}
          lineHeight={2}
          textAlign={"center"}
          borderRadius={10}
          py={1}
          fontSize={14}
          fontWeight={"bold"}
          bg={"darkLight"}
        >
          Ver todo sobre esta oferta
        </Text>
      </Link>
      <Separator top={4} bottom={2} />
      <SideTitle>Horario</SideTitle>
      <Flex flexDirection={"column"} mb={4}>
        {offerData.schedule.map((sche, index) => (
          <ScheduleDropdown key={index} sche={sche} />
        ))}
      </Flex>
      <SideTitle>Más información</SideTitle>
      <FlexText
        left={"Salario"}
        right={formattedSalary(offerData.salary) + "€"}
      />
      <Separator top={1} bottom={1} />
      <FlexText
        left={"Horas extra"}
        right={formattedSalary(offerData.extraSalary) + "€"}
      />
      <Separator top={1} bottom={1} />
      {offerData.extras.map(
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
      {offerData.description && (
        <>
          <Separator top={1} bottom={1} />
          <Text mb={1} fontSize={14} lineHeight={2} fontWeight="medium">
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
