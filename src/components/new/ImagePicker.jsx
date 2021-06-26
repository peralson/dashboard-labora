import React from "react";
import {  Text, Flex } from "@chakra-ui/react";

// File
import FileInput from "react-simple-file-input";

const ImagePicker = ({ title, optional, placeholder, onChange, ...rest }) => {
	const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

	const fileIsIncorrectFiletype = (file) => {
		if (allowedFileTypes.indexOf(file.type) === -1) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<Flex flexDirection="column" mb={4} {...rest}>
			<Text fontWeight={"bold"} lineHeight={2}>
				{title}
				{optional ? "" : " *"}
			</Text>
			<FileInput
				style={{
					width: "100%",
					height: "100%",
				}}
				readAs="binary"
				onLoad={(event) => onChange(btoa(event.target.result))}
				cancelIf={fileIsIncorrectFiletype}
			/>
		</Flex>
	);
};

export default ImagePicker;

// Styled image picker (wip)
/*
import React, { useState } from "react";
import { Text, Flex } from "@chakra-ui/react";

// File
import Files from "react-files";

// Icons
import { MdFileUpload } from "react-icons/md";

const ImagePicker = ({ title, optional, placeholder, onChange, ...rest }) => {
	const [setImage] = useState(placeholder);
	const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

	const fileIsIncorrectFiletype = (file) => {
		if (allowedFileTypes.indexOf(file.type) === -1) {
			return true;
		} else {
			return false;
		}
	};
	return (
		<Flex flexDirection="column" mb={4}>
			<Text fontWeight={"bold"} lineHeight={2}>
				{title}
				{optional ? "" : " *"}
			</Text>
			<Flex
				cursor="pointer"
				mt={2}
				w="100%"
				h="200px"
				borderRadius={8}
				borderWidth={2}
				borderColor={"darkLight"}
				_active={{ borderColor: "white" }}
				_focus={{ borderColor: "white" }}
				{...rest}
				justifyContent="center"
				alignItems="center"
			>
				<Files
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					className="files-dropzone"
					onChange={(e) => console.log("ee", e.target.file)}
					accepts={["image/png", "image/jpeg", "image/gif"]}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>
					<MdFileUpload fontSize="56px" />
				</Files>
			</Flex>
		</Flex>
	);
};

export default ImagePicker;

*/