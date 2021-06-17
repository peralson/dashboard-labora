import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const PastProjectLegalSide = ({ contractLink, payrollLink }) => {
	return (
		<Flex flexDirection='column'>
      <Text>Descargar tus contratos o nóminas de todas las ofertas del proyecto</Text>
			<Flex w='100%' my={4}>
				<a
					href={
						"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
					}
					target="_blank"
					rel="noopener noreferrer"
          style={{width: '100%'}}
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
            w='100%'
						justifyContent="center"
						textAlign="center"
					>
						Descargar contratos
					</Flex>
				</a>
			</Flex>
			<Flex w='100%'>
				<a
					href={
						"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
					}
					target="_blank"
					rel="noopener noreferrer"
          style={{width: '100%'}}
				>
					<Flex
						textAlign="center"
						justifyContent="center"
						borderRadius={8}
						_hover={{ cursor: "pointer" }}
						border={"1px solid"}
						borderColor={"translucid"}
						bg={"darkLight"}
						alignItems={"center"}
						px={4}
						py={2}
					>
						Descargar nóminas
					</Flex>
				</a>
			</Flex>
		</Flex>
	);
};

export default PastProjectLegalSide;
