import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Lib
import { useLocation } from "react-router-dom";

// Hooks & actions
import { connect } from "react-redux";

// Components
import Main from "../components/main/Main";
import Side from "../components/main/Side";
import Documentation from "../components/main/Documentation";
import Separator from "../components/ui/Separator";

const OneOffer = ({ projects }) => {
  const id = useLocation().pathname.split("/")[3];

  return (
    <>
      <Main>
        <Box
          zIndex={100}
          position="sticky"
          top={0}
          pt={4}
          width="100%"
          bg="dark"
        >
          <Flex>
            <Text>{id}</Text>
          </Flex>
          <Separator top={3} />
        </Box>
      </Main>
      <Side>
        <Flex
          position="sticky"
          top={0}
          h="100vh"
          flexDirection="column"
          alignItems="flex-start"
          p="16px 0px"
        >
          <Documentation />
        </Flex>
      </Side>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

export default connect(mapStateToProps, null)(OneOffer);
