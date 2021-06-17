import React from "react";
import { Flex, Box } from "@chakra-ui/layout";

// Lib
import { formattedSalary } from "../../lib/formattedSalary";
import {
	getTotalProject,
	getTotalOffer,
	getTotalExtras,
} from "../../lib/getTotalCost";
import { daysAndHoursFromOffer } from "../../lib/totalDaysAndHours";

// Components
import SideTitle from "./SideTitle";
import FlexText from "./FlexText";
import Separator from "./Separator";

const getProjectCosts = (projectOffers) => {
	return (
		<Box>
			{projectOffers.map((offer) => {
				return (
					<Box key={offer.id}>
						<SideTitle>{`${offer.offerData.name}`}</SideTitle>
						<FlexText
							left={`Salario`}
							right={formattedSalary(offer.offerData.salary) + " €/h"}
						/>
						<FlexText
							left={`Extras`}
							right={formattedSalary(getTotalExtras(offer.offerData)) + " €"}
						/>
						<FlexText left={`Trabajadores`} right={offer.offerData.qty} />
						<FlexText
							left={`Horas`}
							right={
								daysAndHoursFromOffer(offer.offerData.schedule)
									.totalHoursAndMins.hours + " h"
							}
						/>
						<FlexText
            bold={true}
							left={`Total`}
							right={formattedSalary(getTotalOffer(offer.offerData)) + " €"}
						/>
						<Separator top={2} bottom={2} />
					</Box>
				);
			})}
		</Box>
	);
};

const PastProjectCostsSide = ({ data }) => {
	return (
		<Flex flexDirection="column">
			{data.length > 0 && (
				<Box flexDirection="column">
					{getProjectCosts(data)}
					<FlexText
						left={<SideTitle>Coste total</SideTitle>}
						right={
							<SideTitle>
								{formattedSalary(getTotalProject(data)) + " €"}
							</SideTitle>
						}
					/>
				</Box>
			)}
		</Flex>
	);
};

export default PastProjectCostsSide;
