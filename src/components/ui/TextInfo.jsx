import React from "react";
import { Box, Text } from "@chakra-ui/layout";

const TextInfo = (props) => (
  <Box>
    <Text mb={2} fontSize={14} fontWeight={"bold"}>
      {props.title}
    </Text>
    <Text
      py={2}
      px={3}
      borderRadius={4}
      borderWidth={2}
      borderColor={"darkLight"}
      {...props}
    >
      {props.info}
    </Text>
  </Box>
);

export default TextInfo;
