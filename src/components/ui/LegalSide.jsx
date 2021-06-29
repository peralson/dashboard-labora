import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, Spinner } from "@chakra-ui/react";
import eye from "../../assets/svg/eye.svg";

const LegalSide = ({ offerId }) => {
	const [contractData, setContractData] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		setError(null);
    setLoading(true);
    fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/contract/${offerId}?type=offer`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("fbase_key")}`,
        },
      },
    )
      .then((blob) => blob.json())
      .then((data) => setContractData(data.body))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  
  return (
		<Box>
			<Flex flexDirection={"column"} alignItems={"center"} w={"100%"}>
				{error && (
					<Text>Error</Text>
				)}
				{loading && (
					<Flex flexDirection={"column"} alignItems={"center"} py={4}>
						<Spinner mt={2} color={"primary"} />
						<Text mt={6}>
							Cargando...
						</Text>
					</Flex>
				)}
				{!loading && !error && contractData && (
					<>
						<Text fontSize={21} fontWeight={"bold"}>
							Contrato
						</Text>
						<Text fontSize={19}>{contractData.name}</Text> 
						<Image
							src="https://www.seas.es/blog/wp-content/uploads/2014/04/imagen1.jpg"
							alt={"Previsualización del contrato"}
							maxW={"100px"}
							mb={6}
							mt={2}
							borderRadius={4}
						/>
						<a href={contractData.url} target="_blank" rel="noreferrer">
							<Flex
								bg={"darkLight"}
								mr={2}
								py={2}
								px={4}
								borderRadius={10}
								alignItems={"center"}
							>
								<Image src={eye} alt={"Ver contrato"} w={"12px"} />
								<Text ml={2} color={"primary"} fontSize={14}>
									Ver contrato completo
								</Text>
							</Flex>
						</a>
					</>
				)}
			</Flex>
		</Box>
	)
};

export default LegalSide;