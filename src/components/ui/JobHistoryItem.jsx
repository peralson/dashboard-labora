import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/layout'
import moment from 'moment'

const JobHistoryItem = ({ job, index }) => {
    let totalHours = 0
    job.schedule.forEach(sche => {
        sche.shifts.forEach(shift => {
            totalHours = totalHours + (shift.end._seconds - shift.start._seconds)
        })
    })
    return (
        <Flex
            mt={index === 0 ? 2 : 1}
            w={"100%"}
            p={"12px 8px"}
            bg={"translucid"}
            borderRadius={"8px"}
            alignItems="center"
        >
            <Box flex="1">
                <Text lineHeight={1} color={"primary"} fontSize={"12px"}>
                    {job.category.toUpperCase()}
                </Text>
                <Text lineHeight={1} mt={2} fontSize={"14px"}>
                    {job.eventName}
                </Text>
            </Box>
            <Text lineHeight={1} fontSize={"14px"}>
                {moment(totalHours * 1000).format("H")} horas
            </Text>
        </Flex>
    )
}

export default JobHistoryItem
