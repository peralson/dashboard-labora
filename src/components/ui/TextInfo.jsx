import React from "react";
import { Box, Text } from "@chakra-ui/layout";

const TextInfo = ({ title, info, ...rest }) => (
  <Box>
    <Text mb={2} fontSize={14} fontWeight={"bold"}>
      {title}
    </Text>
    <Text
      py={2}
      px={3}
      borderRadius={10}
      borderWidth={2}
      borderColor={"darkLight"}
      textOverflow={"ellipsis"}
      overflowWrap={"revert"}
      {...rest}
    >
      {info}
    </Text>
  </Box>
);

export default TextInfo;
