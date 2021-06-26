import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

// Assets
import appstore from "../../../assets/img/appstore.png";
import playstore from "../../../assets/img/playstore.png";

const SuccessfulWorkerRegistartion = () => {
	return (
		<Flex flexDirection="column" w="400px">
			<Text w="100%" textAlign="center" fontSize={28} mb={16}>
				¡Te has registrado con éxito!
			</Text>
			<Text w="100%" textAlign="center" fontSize={16} mb={8}>
				A partir de ahora necesitarás la aplicación para trabajadores
			</Text>
			<Flex
				w="100%"
				justifyContent="center"
				display="column"
				alignItems="center"
        px='25%'
			>
				<Flex
					as={"a"}
					href={"https://play.google.com/store?hl=es_419&gl=US"}
					w="200px"
					target={"_blank"}
          mb={4}
				>
					<Image src={playstore} alt="PlayStore" w="100%" />
				</Flex>
				<Flex
					as={"a"}
					href={"https://www.apple.com/es/ios/app-store/"}
					w="200px"
					target={"_blank"}
				>
					<Image src={appstore} alt="AppStore" w="100%" />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SuccessfulWorkerRegistartion;
