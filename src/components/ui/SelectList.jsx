import React from "react";
import { Select } from "@chakra-ui/react";

const SelectList = ({ placeholder, onChange, color, values, ...rest }) => (
	<Select
		placeholder={placeholder}
		onChange={onChange}
		borderRadius={8}
		borderWidth={1}
		borderColor="translucid"
		_hover={{ borderColor: "translucid" }}
		_focus={{ borderColor: "translucid" }}
		color={color ? color : "white"}
		{...rest}
	>
		{values.map((e) => (
			<option key={e} value={e} style={{color: 'black'}}>
				{e}
			</option>
		))}
	</Select>
);

export default SelectList;
