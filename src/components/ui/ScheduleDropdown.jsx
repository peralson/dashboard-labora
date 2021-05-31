import React, { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Libs
import moment from "moment";
import "moment/locale/es";
import { shiftsHoursCalc } from "../../lib/hoursCalc";

const ScheduleDropdown = ({ sche, index }) => {
  const [open, setOpen] = useState(false);
  const { hours, minutes } = shiftsHoursCalc(sche.shifts);

  return (
    <Box
      border={"2px solid"}
      borderColor={"darkLight"}
      mb={index !== 0 && 2}
      p={3}
      borderRadius={10}
    >
      <Flex>
        <Text flex={1} fontWeight={"bold"} fontSize={14}>
          {moment(sche.day._seconds * 1000).format("D MMMM")}
        </Text>
        <Text
          onClick={() => setOpen(!open)}
          cursor={"pointer"}
          color={"primary"}
          fontSize={14}
        >
          {open ? "Ocultar" : "Ver turnos"}
        </Text>
      </Flex>
      {open && (
        <Flex mt={4} alignItems={"center"}>
          <Flex flexDirection={"column"} alignItems={"center"} pl={3} pr={5}>
            <Text fontWeight={"bold"} fontSize={16}>
              {hours}
              {minutes > 0
                ? minutes < 10
                  ? `:0${minutes}`
                  : `:${minutes}`
                : null}
            </Text>
            <Text fontSize={12} color={"grey.dark"}>
              horas
            </Text>
          </Flex>
          <Box
            flex={1}
            borderLeft={"1px solid"}
            borderColor={sche.shifts.length !== 1 ? "primary" : "transparent"}
          >
            {sche.shifts.map((shift, index) => (
              <Flex
                key={index}
                mt={index !== 0 && 2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                >
                  <Text fontSize={12} color="grey.dark" mr={3}>
                    de
                  </Text>
                  <Text fontWeight={"bold"}>
                    {moment(shift.start._seconds * 1000).format("HH:mm")}
                  </Text>
                </Flex>
                <Flex
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"flex-end"}
                >
                  <Text fontSize={12} color="grey.dark" mr={3}>
                    a
                  </Text>
                  <Text fontWeight={"bold"}>
                    {moment(shift.end._seconds * 1000).format("HH:mm")}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ScheduleDropdown;
