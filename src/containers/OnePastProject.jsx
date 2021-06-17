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
import team from "../assets/svg/team.svg";

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

const OnePastProject = ({ match, history, pastProjects }) => {
	const { id } = match.params;

	const project = pastProjects.find((p) => p.id === id);

	const [selectedItemManage, setSelectedItemManage] = useState(null);
	const [selectedManageSide, setSelectedManageSide] = useState(null);

	if (!project) return <Box></Box>;

	console.log("project", project);

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
							mt={3}
							templateColumns={"1fr 1fr 1fr"}
							w={"100%"}
							columnGap={4}
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
									title={"Equipo"}
									image={team}
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
									<PastProjectOfferItem key={offer.id} offer={offer} />
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
								<Text>Legal</Text>
							)}
							{selectedManageSide === "Horario" && (
								<Text>Horarios</Text>
							)}
							{selectedManageSide === "Equipo" && (
								<Text>Equipo</Text>
							)}
              {selectedManageSide === "OfertaPasada" && (
								<Text>Oferta Pasada</Text>
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