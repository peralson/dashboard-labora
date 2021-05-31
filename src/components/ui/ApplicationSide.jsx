import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'

// Lib
import { daysAndHoursFromHistory } from '../../lib/totalDaysAndHours'
import moment from 'moment'
import 'moment/locale/es'

// Components
import JobHistoryItem from './JobHistoryItem';
import CustomImg from './CustomImg'
import FlexText from './FlexText'
import SideTitle from './SideTitle'
import Separator from './Separator';

const ApplicationSide = ({ data }) => {
	const { totalDaysWorked, totalHoursInSeconds } = daysAndHoursFromHistory(data.worker.history)

  console.log(data);

	return (
    <Box>
      <Flex alignItems="center" mb={3}>
        <CustomImg
          image={data.worker.workerData.images.main}
          w={"80px"}
          h={"80px"}
          borderRadius={"50px"}
          border={"2px solid"}
          borderColor={"dark"}
          backgroundSize={"contain"}
        />
        <Box flex={1} ml={4}>
          <Text fontSize={12} lineHeight={1} mb={2} color={"primary"}>
            {data.offerName.toUpperCase()}
          </Text>
          <Text fontSize={19} fontWeight={"bold"} lineHeight={1}>
            {data.worker.workerData.name}
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Text
          flex={1}
          borderRadius={10}
          bg={"translucid"}
          py={1}
          lineHeight={2}
          fontSize={14}
          textAlign={"center"}
          cursor={"pointer"}
          fontWeight={"bold"}
          color={"white"}
          onClick={() => console.log("Aceptado")}
        >
          Aceptar
        </Text>
        <Text
          flex={1}
          borderRadius={10}
          py={1}
          lineHeight={2}
          fontSize={14}
          textAlign={"center"}
          cursor={"pointer"}
          fontWeight={"bold"}
          color={"red.full"}
          onClick={() => console.log("Rechazado")}
        >
          Rechazar
        </Text>
      </Flex>
      <Separator top={3} bottom={1} />
      {data.worker.tags.length !== 0 && (
        <Box mb={4}>
          <SideTitle mb={2}>Etiquetas</SideTitle>
          <Flex>
            {data.worker.tags.map((tag, index) => (
              <Text
                key={tag}
                fontSize={14}
                padding={"4px 6px"}
                bg={"translucid"}
                color="primary"
                ml={index !== 0 && 1}
                borderRadius={4}
              >
                #{tag}
              </Text>
            ))}
          </Flex>
        </Box>
      )}
      <Box mb={4}>
        <SideTitle mb={2}>Contacto</SideTitle>
        <FlexText
          left={"Teléfono"}
          right={data.worker.workerData.contact.phoneNumber}
        />
        <Separator top={1} bottom={1} />
        <FlexText left={"Email"} right={data.worker.workerData.contact.email} />
      </Box>
      {data.worker.history.length !== 0 && (
        <>
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
            {data.worker.history.map((job, index) => (
              <JobHistoryItem key={job.id} job={job.data} index={index} />
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
}

export default ApplicationSide
