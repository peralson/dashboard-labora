import React, { useState } from "react";
import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Custom
import {
	SelectedItemManage,
	SelectedManageSide,
} from "../context/SelectedItemContext";
import { connect } from "react-redux";

// SVG
import task from "../assets/svg/task-to-do.svg";
import legal from "../assets/svg/legal.svg";
import schedule from "../assets/svg/schedule.svg";

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Side from "../components/main/Side";
import SideSticky from "../components/main/SideSticky";
import SideBoxContainer from "../components/ui/SideBoxContainer";
import BeCurious from "../components/ui/BeCurious";
import TopHeaderBar from "../components/ui/TopHeaderBar";
import Documentation from "../components/main/Documentation";
import SideSelectorPastProject from "../components/ui/SideSelectorPastProject";
import PastProjectOfferItem from "../components/ui/PastProjectOfferItem";
import OfferSide from "../components/ui/OfferSide";

// Side
import ProjectDatesSide from "../components/ui/ProjectDatesSide";
import PastProjectLegalSide from "../components/ui/PastProjectLegalSide"
import PastProjectCostsSide  from "../components/ui/PastProjectCostsSide"

const OnePastProject = ({ match, history, pastProjects }) => {
	const { id } = match.params;

	const project = pastProjects.find((p) => p.id === id);

	const [selectedItemManage, setSelectedItemManage] = useState(null);
	const [selectedManageSide, setSelectedManageSide] = useState(null);

	if (!project) return <Box></Box>;

	return (
		<SelectedItemManage.Provider
			value={{ selectedItemManage, setSelectedItemManage }}
		>
			<SelectedManageSide.Provider
				value={{ selectedManageSide, setSelectedManageSide }}
			>
				<Main>
					<TopMain>
						<TopHeaderBar
							onGoBack={() =>
								project.projectOffers.length !== 0
									? history.goBack()
									: history.push(`../../`)
							}
						>
							Proyecto
						</TopHeaderBar>
					</TopMain>
					<Box pb={10}>
						<Flex mt={6} alignItems={"center"} justifyContent={"space-between"}>
							<Flex flexDirection={"column"} alignItems={"flex-start"} flex={1}>
								<Flex>
									<Text fontSize={21} fontWeight="bold" cursor={"pointer"}>
										{project.projectData.name}
									</Text>
								</Flex>
								<Text fontSize={14} color="primary">
									{project.projectData.location.address}
								</Text>
							</Flex>
						</Flex>

						{project.projectData.description && (
							<Box>
								<Text mt={8} fontWeight={"bold"}>
									Sobre este proyecto
								</Text>
								<Text mt={2} mb={3} color={"grey.dark"} fontStyle={"italic"}>
									{project.projectData.description}
								</Text>
							</Box>
						)}
						<Grid
							mt={8}
							templateColumns={"1fr 1fr 1fr"}
							w={"100%"}
							columnGap={4}
              rowGap={4}
						>
							<SideSelectorPastProject
								title={"Legal"}
								desc={"Contrato, nóminas..."}
								image={legal}
								data={project}
							/>
							<SideSelectorPastProject
								title={"Horario"}
								desc={"Horas totales, turnos..."}
								image={schedule}
								data={project}
							/>
              {project.projectOffers.length > 0 && (
								<SideSelectorPastProject
									title={"Costes"}
									image={legal}
                  desc={"Coste del proyecto"}
									data={project}
								/>
							)}
						</Grid>
						<Flex mt={12} mb={4} alignItems={"center"}>
							<Text flex={1} fontWeight={"bold"}>
								Ofertas de este proyecto
							</Text>
						</Flex>
						{project.projectOffers.length !== 0 ? (
							<Grid
								w={"100%"}
								templateColumns={"1fr 1fr 1fr"}
								columnGap={4}
								rowGap={4}
							>
								{project.projectOffers.map((offer) => (
									<PastProjectOfferItem key={offer.id} offer={offer} context={selectedItemManage}/>
								))}
							</Grid>
						) : (
							<Flex
								w={"100%"}
								my={6}
								alignItems={"center"}
								justifyContent={"center"}
								flexDirection={"column"}
							>
								<Image src={task} mb={4} w={"140px"} />
							</Flex>
						)}
					</Box>
				</Main>
				<Side>
					<SideSticky>
						<Documentation />
						<SideBoxContainer>
							{selectedManageSide === "Legal" && (
								<PastProjectLegalSide />
							)}
							{selectedManageSide === "Horario" && (
								<ProjectDatesSide dates={project.projectData.dates}/>
							)}
              {selectedManageSide === "Costes" && (
								<PastProjectCostsSide data={project.projectOffers}/>
							)}
              {selectedManageSide === "OfertaPasada" && (
								<OfferSide data={selectedItemManage} isPast={true}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnePastProject);
