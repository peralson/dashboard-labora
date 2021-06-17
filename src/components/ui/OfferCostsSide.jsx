import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

// Lib
import { formattedSalary } from "../../lib/formattedSalary";
import { getTotalOffer, getTotalExtras, getTotalBase } from "../../lib/getTotalCost";
import { daysAndHoursFromOffer } from "../../lib/totalDaysAndHours";

// Components
import FlexText from "./FlexText";
import Separator from "./Separator";

const OfferCostsSide = ({ offer }) => {
  console.log('offer:',offer)
	return (
		<Flex flexDirection="column">
      <FlexText
				left={`Costes ${offer.offerData.name}`}
        bold
			/>
			<FlexText
				left={`Salario`}
				right={formattedSalary(offer.offerData.salary) + " €/h"}
			/>
			<FlexText left={`Trabajadores`} right={offer.offerData.qty} />
			<FlexText
				left={`Horas`}
				right={
					daysAndHoursFromOffer(offer.offerData.schedule).totalHoursAndMins
						.hours + " h"
				}
			/>
      <FlexText
				left={`Total base: ${formattedSalary(getTotalBase(offer.offerData))} €`}
        bold
			/>
      <Separator top={4} bottom={4}/>
      <FlexText
				left={`Extra`}
				right={formattedSalary(offer.offerData.extraSalary) + " €"}
			/>
      {offer.offerData.extras.map((extra) => {
				return (
					<FlexText
						left={extra.name}
						right={formattedSalary(extra.amount) + " €"}
					/>
				);
			})}
			<FlexText
				left={`Total extras: ${formattedSalary(getTotalExtras(offer.offerData))} €`}
        bold
			/>

			<Text fontSize={24} mt={4} fontWeight={"bold"}>
				{"Total: " + formattedSalary(getTotalOffer(offer.offerData)) + " €"}
			</Text>
		</Flex>
	);
};

export default OfferCostsSide;
