import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { daysAndHoursFromHistory } from "../../lib/totalDaysAndHours";
import moment from "moment";
import "moment/locale/es";

// Components
import JobHistoryItem from "./JobHistoryItem";
import CustomImg from "./CustomImg";
import FlexText from "./FlexText";
import SideTitle from "./SideTitle";
import Separator from "./Separator";

const WorkerSide = ({ data }) => {
  const { totalDaysWorked, totalHoursInSeconds } = daysAndHoursFromHistory(
    data.history,
  );

  return (
    <Box>
      <Flex alignItems={"center"} mb={4}>
        <CustomImg
          image={data.workerData.images.main}
          w={"64px"}
          h={"64px"}
          borderRadius={"50px"}
          borderWidth={2}
          borderColor={"darkLight"}
          backgroundSize={"contain"}
        />
        <Box flex={1} ml={4}>
          {data.categories.length !== 0 && (
            <Flex mb={1}>
              {data.categories.map((category, index) => {
                const catLength = data.categories.length;
                return (
                  <Text
                    key={category}
                    fontSize={12}
                    color={"accent"}
                    ml={index !== 0 && 1}
                  >
                    {category.toUpperCase()}
                    {index !== catLength - 1 && catLength > 1 && `,`}
                  </Text>
                );
              })}
            </Flex>
          )}
          <Text fontSize={19} fontWeight={"bold"}>
            {data.workerData.name}
          </Text>
        </Box>
      </Flex>
      {data.tags.length !== 0 && (
        <Box mb={4}>
          <SideTitle mb={2}>Etiquetas</SideTitle>
          <Flex>
            {data.tags.map((tag, index) => (
              <Text
                key={tag}
                fontSize={12}
                px={2}
                py={1}
                bg={"darkLight"}
                color={"primary"}
                ml={index !== 0 && 1}
                borderRadius={4}
              >
                #{tag}
              </Text>
            ))}
          </Flex>
        </Box>
      )}
      <Box>
        <SideTitle mb={2}>Contacto</SideTitle>
        <FlexText
          left={"Teléfono"}
          right={data.workerData.contact.phoneNumber}
        />
        <Separator top={1} bottom={1} />
        <FlexText left={"Email"} right={data.workerData.contact.email} />
      </Box>
      {data.history.length !== 0 && (
        <Box mt={4}>
          <SideTitle mb={2}>Experiencia laboral</SideTitle>
          <FlexText
            left={"Horas trabajadas"}
            right={moment(totalHoursInSeconds * 1000).format("H")}
          />
          <Separator top={1} bottom={1} />
          <FlexText left={"Días trabajados"} right={totalDaysWorked} />
          <Separator top={1} bottom={1} />
          <Text mb={1} fontSize={14} lineHeight={2} fontWeight="medium">
            Historial
          </Text>
          <Flex alignItems={"center"} flexDirection={"column"}>
            {data.history.map((job, index) => (
              <JobHistoryItem key={job.id} job={job.data} index={index} />
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default WorkerSide;
