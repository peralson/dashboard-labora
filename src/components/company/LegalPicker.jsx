import React, { useContext } from "react";
import { Text, Box } from "@chakra-ui/react";

import { SelectedCompany } from "../../context/SelectedItemContext";

const LegalPicker = ({ name, desc }) => {
  const { value, setValue } = useContext(SelectedCompany);
  const isActive = value === name;

  return (
    <Box
      py={3}
      px={4}
      bg={"darkLight"}
      borderWidth={1}
      borderColor={isActive ? "white" : "translucid"}
      borderRadius={8}
      cursor={"pointer"}
      onClick={() => {
        setValue(isActive ? null : name);
      }}
    >
      <Text fontSize={14} fontWeight={"bold"}>
        {name}
      </Text>
      {desc && (
        <Text fontSize={14} mt={1} fontStyle={"italic"} color={"grey.dark"}>
          {desc}
        </Text>
      )}
    </Box>
  );
};

export default LegalPicker;
