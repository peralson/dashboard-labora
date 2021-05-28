import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const AccentButton = ({ children, onClick }) => (
  <Flex
    _hover={{ cursor: "pointer" }}
    bg={"accent"}
    borderRadius={8}
    ml={2}
    alignItems={"center"}
    px={4}
    onClick={onClick}
  >
    <Text lineHeight={0} fontWeight="bold" fontSize="14px">
      {children}
    </Text>
  </Flex>
);

export default AccentButton;
