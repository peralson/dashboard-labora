import React, { useState } from 'react';
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
import ErrorMessage from './ErrorMessage';

const JobSide = ({ data }) => {
  const [error, setError] = useState(null)
	const { totalDaysWorked, totalHoursInSeconds } = daysAndHoursFromHistory(data.worker.history)

	return (
    <Box>
      {error && (
        <ErrorMessage
          title={`Ha ocurrido un error al ${error} la aplicatión`}
          onClose={() => setError(null)}
          noMargin
        />
      )}
      <Flex alignItems="center" mb={3} mt={error && 3}>
        <CustomImg
          image={data.worker.workerData.images.main}
          w={"64px"}
          h={"64px"}
          borderRadius={"50%"}
          borderWidth={2}
          borderColor={"darkLight"}
          backgroundSize={"contain"}
        />
        <Box flex={1} ml={4}>
          <Text fontSize={12} mb={1} color={"primary"}>
            {data.offerName.toUpperCase()}
          </Text>
          <Text fontSize={19} fontWeight={"bold"}>
            {data.worker.workerData.name}
          </Text>
        </Box>
      </Flex>
      {data.worker.tags.length !== 0 && (
        <Box mb={4}>
          <SideTitle mb={2}>Etiquetas</SideTitle>
          <Flex>
            {data.worker.tags.map((tag, index) => (
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


export default JobSide;
