import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { Link } from "react-router-dom";

// Components
import DateTag from "./DateTag";

// const OfferItem = ({ data }) => {
//   const PropertyItem = ({ info, title }) => {
//     return (
//       <Flex
//         flexDirection='row'
//         bg='translucid'
//         px={2}
//         py={2}
//         textAlign='center'
//         borderRadius={10}
//       >
//         <Text fontSize={14}>
//           {title && title + ':'} {info}
//         </Text>
//       </Flex>
//     );
//   };

//   return (
//     <Flex
//       cursor={'pointer'}
//       flexDirection={'column'}
//       alignItems={'flex-start'}
//       justifyContent={'space-between'}
//       bg={'darkLight'}
//       _hover={{ border: '1px solid white', transform: 'scale(1.02)' }}
//       p={3}
//       pt={4}
//       borderRadius={10}
//       borderWidth={1}
//       borderColor='translucid'
//       mb={2}
//     >
//       <Box width='100%' flex='1'>
//         <Text fontSize={12} color='primary' lineHeight={1}>
//           {data.offerData.category.toUpperCase()}
//         </Text>
//         <Text fontSize={14} mt={1} lineHeight={1}>
//           {data.offerData.name}
//         </Text>
//       </Box>
//       <Flex
//         flexDirection='row'
//         width='100%'
//         justifyContent={'space-between'}
//         mt={2}
//       >
//         <PropertyItem
//           info={formattedSalary(data.offerData.salary) + ' €'}
//           title='Salario'
//         />
//         <PropertyItem info={data.offerData.qty + ' h'} />
//         <PropertyItem
//           info={data.offerData.qty * data.offerData.salary + ' €'}
//           title='Coste'
//         />
//       </Flex>
//     </Flex>
//   );
// };

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
			<Link to={`/gestion/p/${data.id}`}>
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
					Ver todo sobre este proyecto
				</Text>
			</Link>
		</Box>
	);
};

export default PastProjectSide;
