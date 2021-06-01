import React from "react";
import { Flex, Box } from "@chakra-ui/layout";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";

// Components
import TopHeaderTitle from "./TopHeaderTitle";
import TopButton from "./TopButton";

const TopHeaderBar = ({ history, children, onEdit }) => (
  <Flex alignItems={"center"} justifyContent={"space-evenly"}>
    <Box maxW={"100%"}>
      <TopButton
        left
        icon={back}
        onSelect={() => history.goBack()}
      >
        Volver
      </TopButton>
    </Box>
    <TopHeaderTitle>
      {children}
    </TopHeaderTitle>
    <Box maxW={"100%"}>
      <TopButton
        rigth
        icon={edit}
        onSelect={() => {}}
      >
        Editar
      </TopButton>
    </Box>
  </Flex>
);

export default TopHeaderBar;
