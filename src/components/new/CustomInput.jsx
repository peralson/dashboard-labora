import React from "react";
import { Box, Text, Input, Textarea } from "@chakra-ui/react";

const CustomInput = ({
  multiline,
  title,
  optional,
  value,
  placeholder,
  onChange,
}) => {
  let InputComponent = multiline ? Textarea : Input;

  return (
    <Box>
      <Text mb={2} fontWeight={"bold"} lineHeight={2}>
        {title}
        {optional ? "" : " *"}
      </Text>
      <InputComponent
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        py={2}
        px={3}
        borderRadius={8}
        borderWidth={2}
        borderColor={"darkLight"}
        _active={{ borderColor: "white" }}
        _focus={{ borderColor: "white" }}
      />
    </Box>
  );
};

export default CustomInput;
