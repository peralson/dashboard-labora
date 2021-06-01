import React from "react";
import { Box } from "@chakra-ui/layout";

const SideBoxContainer = ({ children }) => (
  <Box
    p={4}
    w={"100%"}
    overflowY={"scroll"}
    borderRadius={20}
    borderWidth={2}
    borderColor={"darkLight"}
    // __css={{
    //   '&::-webkit-scrollbar': {
    //     width: '4px',
    //     borderRadius: 20
    //   },
    //   '&::-webkit-scrollbar-thumb': {
    //     bg: "rgba(255, 255, 255, 0.2)",
    //     borderRadius: '24px',
    //   }
    // }}
  >
    {children}
  </Box>
);

export default SideBoxContainer;
