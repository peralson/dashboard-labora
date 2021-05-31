import React from "react";
import { Box } from "@chakra-ui/layout";

const SideBoxContainer = ({ children }) => (
  <Box
    p={4}
    w={"100%"}
    borderRadius={20}
    borderWidth={2}
    borderColor={"darkLight"}
  >
    {children}
  </Box>
);

export default SideBoxContainer;
