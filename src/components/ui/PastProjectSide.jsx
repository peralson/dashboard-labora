import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { Link } from "react-router-dom";

// Components
import DateTag from "./DateTag";

const PastProjectSide = ({ data }) => {
	return (
		<Box>
			<Flex alignItems={"center"} justifyContent={"space-between"} mb={2}>
				<DateTag dates={data.projectData.dates} />
			</Flex>
			<Flex flexDirection={"column"} mb={4}>
				<Text fontWeight="bold">
					{data.projectData.name
						? data.projectData.name
						: data.projectOffers[0].offerData.name}
				</Text>
				<Text fontSize={14} color="primary">
					{data.projectData.location.address}
				</Text>
			</Flex>
			<Flex>
				{data.projectData.description && (
					<Text mt={2} mb={3} color={"grey.dark"} fontStyle={"italic"}>
						{data.projectData.description}
					</Text>
				)}
			</Flex>
			<Link
				to={
					data.projectData.name
						? `/gestion/p/${data.id}`
						: `/gestion/o/${data.projectOffers[0].id}`
				}
			>
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
					{data.projectData.name
						? "Ver todo sobre este proyecto"
						: "Ver todo sobre esta oferta"}
				</Text>
			</Link>
		</Box>
	);
};

export default PastProjectSide;
