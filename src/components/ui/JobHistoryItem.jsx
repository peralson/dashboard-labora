import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { getTotalHoursOneJob } from '../../lib/totalDaysAndHours'

const JobHistoryItem = ({ job, index }) => (
    <Flex
      mt={index !== 0 && 2}
      w={"100%"}
      py={3.5}
      px={3}
      bg={"translucid"}
      borderRadius={10}
      alignItems={"center"}
      cursor={"pointer"}
      border={"1px solid"}
      borderColor={"transparent"}
      _hover={{ borderColor: "white" }}
    >
      <Box flex="1">
        <Text lineHeight={1} color={"primary"} fontSize={12}>
          {job.category.toUpperCase()}
        </Text>
        <Text lineHeight={1} mt={2} fontSize={14}>
          {job.eventName}
        </Text>
      </Box>
      <Text lineHeight={1} fontSize={14}>
        {getTotalHoursOneJob(job.schedule)} horas
      </Text>
    </Flex>
  );

export default JobHistoryItem
