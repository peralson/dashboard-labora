import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'
import CustomImg from './CustomImg'
import moment from 'moment'
import 'moment/locale/es'
import JobHistoryItem from './JobHistoryItem';

const ApplicationSide = ({ data }) => {
	let totalDaysWorked = 0
	let totalHoursInSeconds = 0
	data.worker.history.forEach(job => {
		job.data.schedule.forEach(day => {
			totalDaysWorked = totalDaysWorked + 1
			day.shifts.forEach(shift => {
				totalHoursInSeconds = totalHoursInSeconds + (shift.end._seconds - shift.start._seconds)
			})
		})
	})
	return (
		<Box>
			<Flex alignItems="center">
				<Box flex={1} mr={4}>
					<Text fontSize={12} lineHeight={1} mb={2} color={"primary"}>
						{data.offerName.toUpperCase()}
					</Text>
					<Text fontSize={19} fontWeight={"bold"} lineHeight={1}>
						{data.worker.workerData.name}
					</Text>
				</Box>
				<CustomImg
					image={data.worker.workerData.images.main}
					w={"80px"}
					h={"80px"}
					borderRadius={"50px"}
					border={"2px solid"}
					borderColor={"dark"}
					backgroundSize={"contain"}
				/>
			</Flex>
			{data.worker.history.length !== 0 && (
				<>
					<Text mt={8} mb={2} fontSize={14} fontWeight="bold">Experiencia en tu empresa</Text>
					<Flex mb={1} alignItems={"center"} justifyContent="space-between">
						<Text fontSize={14} color="primary">
							Horas trabajadas
						</Text>
						<Text fontSize={14}>
							{moment(totalHoursInSeconds * 1000).format('H')}
						</Text>
					</Flex>
					<Flex alignItems={"center"} justifyContent="space-between">
						<Text fontSize={14} color="primary">
							Días trabajados
						</Text>
						<Text fontSize={14}>
							{totalDaysWorked}
						</Text>
					</Flex>
				</>
			)}
			{data.tags.length !== 0 && (
				<>
					<Text mt={6} fontSize={14} fontWeight="bold">Etiquetas</Text>
					<Flex>
						{data.tags.map((tag, index) => (
							<Text
								key={index}
								mt={2}
								fontSize={14}
								padding={"4px 6px"}
								bg={"translucid"}
								color="primary"
								ml={index !== 0 && 2}
								borderRadius={4}
							>
								#{tag}
							</Text>
						))}
					</Flex>
				</>
			)}
			{data.worker.history.length !== 0 && (
				<>
					<Text mt={6} fontSize={14} fontWeight="bold">Historial de trabajos</Text>
					<Flex alignItems={'center'} flexDirection={"column"}>
						{data.worker.history.map(
							(job, index) => <JobHistoryItem key={job.id} job={job.data} index={index} />
						)}
					</Flex>
				</>
			)}
		</Box>
	)
}

export default ApplicationSide
