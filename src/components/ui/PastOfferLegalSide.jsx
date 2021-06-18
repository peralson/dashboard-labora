import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/layout";

// Redux & Actions
import { connect } from "react-redux";
import { fetchContractsZip } from "../../store/actions/contracts";

const PastOfferLegalSide = ({ offerId, fetchContractsZip }) => {
	const [loading, setLoading] = useState(true);
	const [contractLink, setContractLink] = useState();
	const [payrollLink, setPayrollLink] = useState();

	useEffect(() => {
		const getLink = async () => {
			setLoading(true);
			setContractLink(await fetchContractsZip(offerId));
      setLoading(false);
		};
		setPayrollLink();
		getLink();
		
	}, [offerId, fetchContractsZip]);

	return (
		<Flex flexDirection="column">
			{loading ? (
				<Text>Cargando...</Text>
			) : (
				<Flex flexDirection="column">
					<Text>Descargar todos los contratos y nóminas de la oferta</Text>
					{contractLink && (
						<Flex w="100%" my={4}>
							<a
								href={contractLink}
								target="_blank"
								rel="noopener noreferrer"
								style={{ width: "100%" }}
							>
								<Flex
									borderRadius={8}
									_hover={{ cursor: "pointer" }}
									border={"1px solid"}
									borderColor={"translucid"}
									bg={"darkLight"}
									alignItems={"center"}
									px={4}
									mr={4}
									py={2}
									w="100%"
									justifyContent="center"
									textAlign="center"
								>
									Descargar contratos
								</Flex>
							</a>
						</Flex>
					)}
					{payrollLink && (
						<Flex w="100%" my={4}>
							<a
								href={payrollLink}
								target="_blank"
								rel="noopener noreferrer"
								style={{ width: "100%" }}
							>
								<Flex
									borderRadius={8}
									_hover={{ cursor: "pointer" }}
									border={"1px solid"}
									borderColor={"translucid"}
									bg={"darkLight"}
									alignItems={"center"}
									px={4}
									py={2}
									w="100%"
									justifyContent="center"
									textAlign="center"
								>
									Descargar nóminas
								</Flex>
							</a>
						</Flex>
					)}
				</Flex>
			)}
		</Flex>
	);
};

const mapDispatchToProps = {
	fetchContractsZip,
};

const mapStateToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(PastOfferLegalSide);
