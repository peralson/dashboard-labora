import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout'
import CustomImg from './CustomImg'
import moment from 'moment'
import 'moment/locale/es'
import JobHistoryItem from './JobHistoryItem';
import Separator from './Separator';

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
			<Flex alignItems="center" mb={4}>
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
			<Flex mb={2}>
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
			{data.worker.tags.length !== 0 && (
				<Box mb={4}>
					<Text flex={1} fontSize={16} lineHeight={2} fontWeight="bold" mb={2}>
						Etiquetas
					</Text>
					<Flex>
						{data.worker.tags.map((tag, index) => (
							<Text
								key={tag}
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
				</Box>
			)}
			{data.worker.history.length !== 0 && (
				<Box mb={4}>
					<Text flex={1} fontSize={16} fontWeight="bold" mb={2}>
						Más información
					</Text>
					<Flex>
						<Text flex={1} fontSize={14} color={"primary"}>
							Horas trabajadas
						</Text>
						<Text lineHeight={2} fontSize={14}>
							{moment(totalHoursInSeconds * 1000).format('H')}
						</Text>
					</Flex>
					<Separator top={1} bottom={1} />
					<Flex>
						<Text flex={1} fontSize={14} color={"primary"}>
							Días trabajados
						</Text>
						<Text fontSize={14}>
							{totalDaysWorked}
						</Text>
					</Flex>
				</Box>
			)}
			{data.worker.history.length !== 0 && (
				<>
					<Text flex={1} fontSize={16} lineHeight={2} fontWeight="bold" mb={2}>
						Historial de trabajos
					</Text>
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
