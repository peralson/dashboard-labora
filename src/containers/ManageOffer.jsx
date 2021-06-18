import React, { useState } from "react";
import { Flex, Box, Text, Grid } from "@chakra-ui/react";

// Custom
import { connect } from "react-redux";
import { formattedSalary } from "../lib/formattedSalary";

// Context
import {
	SelectedItemManage,
	SelectedManageSide,
} from "../context/SelectedItemContext";

// SVG
import legal from "../assets/svg/legal.svg";
import schedule from "../assets/svg/schedule.svg";

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Side from "../components/main/Side";
import SideSticky from "../components/main/SideSticky";
import SideBoxContainer from "../components/ui/SideBoxContainer";
import Documentation from "../components/main/Documentation";
import SideSelectorPastProject from "../components/ui/SideSelectorPastProject";
import OneOfferJob from "../components/ui/OneOfferJob";
import TextInfo from "../components/ui/TextInfo";
import ScheduleSide from "../components/ui/ScheduleSide";
import PastOfferLegalSide from "../components/ui/PastOfferLegalSide";
import TopHeaderBar from "../components/ui/TopHeaderBar";
import BeCurious from "../components/ui/BeCurious";
import OfferCostsSide from "../components/ui/OfferCostsSide";
import JobSide from "../components/ui/JobSide";

const ManageOffer = ({ match, history, pastProjects }) => {
	const { id } = match.params;

	const [selectedItemManage, setSelectedItemManage] = useState(null);
	const [selectedManageSide, setSelectedManageSide] = useState(null);

	const project = pastProjects.find(({ projectOffers }) =>
		projectOffers.some((offer) => offer.id === id)
	);

	if (!project) return <Box></Box>;

	const offer = project.projectOffers.find((offer) => offer.id === id);

	if (!offer) return <Box></Box>;

	return (
		<SelectedItemManage.Provider
			value={{ selectedItemManage, setSelectedItemManage }}
		>
			<SelectedManageSide.Provider
				value={{ selectedManageSide, setSelectedManageSide }}
			>
				<Main>
					<TopMain>
						<TopHeaderBar onGoBack={() => history.push(`../../gestion`)}>
							Oferta
						</TopHeaderBar>
					</TopMain>
					<Box pb={10}>
						{project.projectData.name && (
							<Flex mt={2} alignItems={"flex-end"} justifyContent={"flex-end"}>
								<Text fontSize={14} lineHeight={1.5}>
									Esta oferta pertenece al proyecto:
								</Text>
								<Text
									color={"primary"}
									ml={2}
									fontSize={14}
									lineHeight={1.35}
									_hover={{ textDecoration: "underline" }}
								>
									{project.projectData.name}
								</Text>
							</Flex>
						)}
						<Grid
							columnGap={8}
							width={"100%"}
							templateColumns={"3fr 1fr"}
							my={4}
						>
							<Box>
								<Grid gap={4} width={"100%"} templateColumns={"1fr 1fr"} mb={4}>
									<TextInfo title="Nombre" info={offer.offerData.name} />
									<TextInfo title="Categoría" info={offer.offerData.category} />
									<TextInfo
										title="Salario"
										info={formattedSalary(offer.offerData.salary) + "€"}
									/>
									<TextInfo
										title="Horas extra"
										info={formattedSalary(offer.offerData.extraSalary) + "€"}
									/>
									<TextInfo title="Cantidad" info={offer.offerData.qty} />
								</Grid>
								<TextInfo
									title="Requerimientos"
									info={offer.offerData.description}
									minH={"120px"}
								/>
							</Box>
							<Box>
								<SideSelectorPastProject
									mb={4}
									title={"Legal"}
									desc={"Contrato, nóminas..."}
									image={legal}
									data={offer}
								/>
								<SideSelectorPastProject
									mb={3}
									title={"Horario"}
									desc={"Horas totales, turnos..."}
									image={schedule}
									data={offer}
								/>
								<SideSelectorPastProject
									mb={3}
									title={"Costes"}
									image={legal}
									desc={"Coste de la oferta"}
									data={offer}
								/>
							</Box>
						</Grid>
						{offer.offerJobs.length > 0 && (
							<>
								<Text fontSize={19} mb={2} fontWeight={"bold"} lineHeight={2}>
									Equipo
								</Text>
								<Grid
									w={"100%"}
									templateColumns={"1fr 1fr 1fr"}
									columnGap={4}
									rowGap={4}
								>
									{offer.offerJobs.map((job) => (
										<OneOfferJob key={job.id} job={job} />
									))}
								</Grid>
							</>
						)}
					</Box>
				</Main>
				<Side>
					<SideSticky>
						<Documentation />
						<SideBoxContainer>
							{selectedManageSide === "Legal" && (
								<PastOfferLegalSide offerId={offer.id} />
							)}
							{selectedManageSide === "Horario" && (
								<ScheduleSide schedules={offer.offerData.schedule} />
							)}
							{selectedManageSide === "Costes" && (
								<OfferCostsSide offer={offer} />
							)}
							{selectedManageSide === "Job" && (
								<JobSide data={selectedItemManage} />
							)}
							{!selectedManageSide && (
								<BeCurious
									text={
										"Selecciona cualquier elemento para ver más información del mismo."
									}
								/>
							)}
						</SideBoxContainer>
					</SideSticky>
				</Side>
			</SelectedManageSide.Provider>
		</SelectedItemManage.Provider>
	);
};

const mapStateToProps = (state) => {
	return {
		pastProjects: state.projects.pastProjects,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOffer);
