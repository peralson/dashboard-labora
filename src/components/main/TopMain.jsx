import React from "react";
import { Box } from "@chakra-ui/layout";

const TopMain = props => (
  <Box
    zIndex={100} 
    position={"sticky"}
    top={0}
    pt={4}
    width={"100%"}
    bg={"dark"}
    pb={2.5}
    borderBottom={"2px solid"}
    borderColor={"darkLight"}
    {...props}
  >
    {props.children}
  </Box>
);

export default TopMain;
