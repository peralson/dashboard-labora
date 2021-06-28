import React, { useState } from "react";
import {
	Flex,
	Text,
	Box,
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";

// Redux & Actions
import { connect } from "react-redux";
import { createTags } from "../../store/actions/tags";

// Components
import ErrorMessage from "../ui/ErrorMessage";
import CustomInput from "../new/CustomInput";

const CreateTags = ({ handleShow, createTags }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [tags, setTags] = useState();
	const isValid = tags;

	const handleTags = (e) => {
		setTags(e.target.value);
	};

	const handleSubmit = async () => {
		const tagArray = tags.replace(/\s+/g, "").split(",");

		tagArray.forEach((tag) => {
			if (tag === "") {
				const index = tagArray.indexOf(tag);
				tagArray.splice(index, 1);
			}
		});
		if (tagArray.length > 0) {
			setError(null);
			setLoading(true);
			try {
				await createTags(tagArray);
				handleShow(false);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		} else {
			setIsOpen(true);
		}
	};

	return (
		<Box>
			{error && (
				<ErrorMessage
					title={"Ha ocurrido un error"}
					onClose={() => setError(null)}
					noMargin
					mb={4}
				/>
			)}
			<Text>
				Introduce las etiquetas separadas por comas:
			</Text>
			<CustomInput
				optional
				bg={"translucid"}
				onChange={(e) => handleTags(e)}
			/>
			<Flex mt={4} justifyContent={"flex-end"}>
				<Flex
					_hover={{ cursor: isValid && "pointer" }}
					bg={"accent"}
					borderRadius={8}
					fontWeight={"bold"}
					fontSize={14}
					alignItems={"center"}
					px={4}
					py={2}
					opacity={!isValid && 0.6}
					onClick={isValid && handleSubmit}
				>
					{loading ? `Creando etiquetas...` : `Crear etiquetas`}
				</Flex>
			</Flex>
			<AlertDialog isOpen={isOpen}>
				<AlertDialogOverlay>
					<AlertDialogContent bg="darkLight">
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Error
						</AlertDialogHeader>

						<AlertDialogBody>
							<Flex flexDirection="column">
								<Text>Debes introducir etiquetas válidas</Text>
							</Flex>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button bg="translucid" onClick={() => setIsOpen(false)}>
								Aceptar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
};

const mapDispatchToProps = {
	createTags,
};

export default connect(null, mapDispatchToProps)(CreateTags);
