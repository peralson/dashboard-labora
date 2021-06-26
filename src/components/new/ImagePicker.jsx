import React, { useState } from "react";
import { Text, Flex, Image } from "@chakra-ui/react";

// File
import Files from "react-files";

// Icons
import { MdFileUpload } from "react-icons/md";

const ImagePicker = ({ title, optional, placeholder, onChange, ...rest }) => {
	const [image, setImage] = useState(placeholder);

	const toDataUrl = (url, callback) => {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			var reader = new FileReader();
			reader.onloadend = function () {
				callback(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.send();
	};

	const handleImage = (url) => {
		toDataUrl(url, (myBase64) => {
			onChange(myBase64);
			setImage(url);
		});
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
					onChange={(e) => handleImage(e[0].preview.url)}
					accepts={["image/png", "image/jpeg", "image/gif"]}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>
					{image ? (
						<Image
							src={image}
							alt="image"
							w="100%"
							h="100%"
							objectFit="cover"
						/>
					) : (
						<MdFileUpload fontSize="56px" />
					)}
				</Files>
			</Flex>
		</Flex>
	);
};

export default ImagePicker;
