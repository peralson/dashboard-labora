import React from "react";
import { Flex, Box, Text, Image } from "@chakra-ui/react";

import cancel from "../../assets/svg/cancel.svg";

const ErrorMessage = ({ title, secondary, onClose, noMargin, ...rest }) => (
  <Box
    py={3}
    px={4}
    borderRadius={10}
    bg={"red.smooth"}
    mt={!noMargin && 4}
    {...rest}
  >
    <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
      <Text fontWeight={"bold"} color={"red.full"} mr={4}>
        {title}
      </Text>
      <Box cursor={"pointer"} onClick={onClose}>
        <Image src={cancel} w={"12px"} />
      </Box>
    </Flex>
    {secondary && (
      <Text mt={2} color={"red.full"}>
        {secondary}
      </Text>
    )}
  </Box>
);

export default ErrorMessage;
