// React
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

// Icons
import { MdContentCopy } from "react-icons/md";

// Custom
import gsap from "gsap";
import { connect } from "react-redux";
import { inviteWorker } from "../../store/actions/workers";

// Components
import MultipleSelectList from "../ui/MultipleSelectList";
import ErrorMessage from "../ui/ErrorMessage";
import SelectList from "../ui/SelectList";

const ShareLink = ({ categories, tags, inviteWorker }) => {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [expiration, setExpiration] = useState();
	const [link, setLink] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const tl = gsap.timeline();

	const handleCategories = (e) => {
		if (!selectedCategories.includes(e.target.name)) {
			setSelectedCategories([...selectedCategories, e.target.name]);
		} else {
			setSelectedCategories(
				selectedCategories.filter((item) => item !== e.target.name)
			);
		}
	};

	const handleTags = (e) => {
		if (!selectedTags.includes(e.target.name)) {
			setSelectedTags([...selectedTags, e.target.name]);
		} else {
			setSelectedTags(selectedTags.filter((item) => item !== e.target.name));
		}
	};

	const handleExpiration = (e) => {
		const today = new Date();
		switch (e.target.options.selectedIndex) {
			case 1:
				setExpiration(today.setDate(today.getDate() + 1));
				break;
			case 2:
				setExpiration(today.setDate(today.getDate() + 7));
				break;
			case 3:
				setExpiration(today.setDate(today.getDate() + 15));
				break;
			default:
				setExpiration(null);
		}
	};

	const handleLink = async () => {
		if (expiration && selectedCategories.length > 0) {
			try {
				setLoading(true);
				setError(null);
				const id = await inviteWorker(
					selectedCategories,
					selectedTags,
					expiration
				);
				setLink(`${window.location.origin}/registro/${id}`);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		} else {
			setIsOpen(true);
		}
	};

	const handleClick = () => {
		const element = document.getElementById("msg");
		tl.to(element, {
			opacity: 1,
			duration: 1,
		});
		tl.to(
			element,
			{
				top: "-50px",
				duration: 2,
			},
			"-=1"
		);
		tl.to(
			element,
			{
				opacity: 0,
				duration: 1,
			},
			"-=1"
		);
		tl.to(element, {
			top: "0",
			duration: 0,
		});

		navigator.clipboard.writeText(link);
	};

	return (
		<Box>
			{error && (
				<ErrorMessage
					title={"Ha ocurrido un error al crear el enlance"}
					noMargin
					mb={2}
					onClose={() => setError(null)}
				/>
			)}
			<Text mb={2}>Propiedades de los trabajadores:</Text>
			<Flex flexDirection={"row"} mb={6}>
				<MultipleSelectList
					title={"Categorias"}
					flex={1}
					bg={"dark"}
					mr={2}
					current={selectedCategories}
					values={categories}
					onChange={handleCategories}
				/>
				<MultipleSelectList
					title={"Etiquetas"}
					flex={1}
					bg={"dark"}
					current={selectedTags}
					values={tags}
					onChange={handleTags}
				/>
			</Flex>
			<Text mb={2}>Fecha de caducidad del enlace:</Text>
			<SelectList
				placeholder="Selecciona caducidad"
				onChange={(e) => handleExpiration(e)}
				values={["Mañana", "Una semana", "15 dias"]}
				color="white"
			/>
			<Flex
				_hover={{ cursor: "pointer" }}
				bg={"accent"}
				borderRadius={8}
				fontWeight="bold"
				fontSize={16}
				mt={8}
				alignItems={"center"}
				justifyContent={"center"}
				px={4}
				py={2}
				onClick={handleLink}
			>
				{loading ? "Creando enlace..." : "Crear enlace"}
			</Flex>
			{link && (
				<Box mt={4}>
					<Button
						size="md"
						height="48px"
						width="100%"
						bg="translucid"
						color="grey"
						_focus={{ borderColor: "none" }}
						onClick={handleClick}
					>
						<Flex
							w="100%"
							justifyContent="center"
							alignContent="center"
							position="relative"
						>
							<Text w="100%" fontSize={12}>
								{link}
							</Text>
							<MdContentCopy />
							<Text position="absolute" id="msg" opacity={0} mt={2}>
								Enlace copiado!
							</Text>
						</Flex>
					</Button>
				</Box>
			)}
			<AlertDialog isOpen={isOpen}>
				<AlertDialogOverlay>
					<AlertDialogContent bg="darkLight">
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Error
						</AlertDialogHeader>

						<AlertDialogBody>
							<Flex flexDirection="column">
								<Text>
									{selectedCategories.length <= 0 &&
										"Debes seleccionar al menos una categoría."}
								</Text>
								<Text>
									{!expiration &&
										"Debes seleccionar una fecha de caducidad para el enlace."}
								</Text>
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
	inviteWorker,
};

export default connect(null, mapDispatchToProps)(ShareLink);
