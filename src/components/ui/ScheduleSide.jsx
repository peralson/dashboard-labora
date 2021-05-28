import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { daysAndHoursFromOffer } from "../../lib/totalDaysAndHours";
import Separator from "./Separator";
import SideTitle from "./SideTitle";
import ScheduleDropdown from "./ScheduleDropdown";

const ScheduleSide = ({ schedules }) => {
  const { totalDaysWorked, totalHoursAndMins } =
    daysAndHoursFromOffer(schedules);

  return (
    <Box>
      <Text fontSize={19} color={"primary"}>
        {totalDaysWorked === 1 ? "Un día," : `${totalDaysWorked} días,`}
      </Text>
      <Text fontSize={24} fontWeight={"bold"}>
        {totalHoursAndMins.hours === 1
          ? "Una hora"
          : `${totalHoursAndMins.hours} horas`}
        {totalHoursAndMins.mins > 0 && ` y ${totalHoursAndMins.mins} minutos`}
      </Text>
      <Separator top={2} bottom={4} />
      <SideTitle>Horarios por día</SideTitle>
      <Flex flexDirection={"column"}>
        {schedules.map((sche, index) => (
          <ScheduleDropdown key={index} sche={sche} />
        ))}
      </Flex>
    </Box>
  );
};

export default ScheduleSide;
