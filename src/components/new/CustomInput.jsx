import React from "react";
import { Box, Text, Input, Textarea } from "@chakra-ui/react";

const CustomInput = ({
	multiline,
	title,
	optional,
	value,
	placeholder,
	onChange,
	type = "text",
	...rest
}) => {
	let InputComponent = multiline ? Textarea : Input;

	return (
		<Box>
			<Text fontWeight={"bold"} lineHeight={2}>
				{title}
				{optional ? "" : " *"}
			</Text>
			<InputComponent
				mt={2}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				py={2}
				px={3}
				borderRadius={8}
				borderWidth={2}
				borderColor={"darkLight"}
				_active={{ borderColor: "white" }}
				_focus={{ borderColor: "white" }}
				{...rest}
			/>
		</Box>
	);
};

export default CustomInput;
