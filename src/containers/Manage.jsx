import React, { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// Components
import Main from "../components/main/Main";
import Side from "../components/main/Side";
import SearchBar from "../components/ui/SearchBar";
import Separator from "../components/ui/Separator";
import ManageProjects from "./innerContainers/ManageProjects";
import ManageContracts from "./innerContainers/ManageContracts";
import ManagePayrolls from "./innerContainers/ManagePayrolls";

const CustomTab = (props) => {
  return (
    <Tab
      _hover={{ borderColor: "translucid" }}
      _focus={{ borderColor: "translucid" }}
      bg="darkLight"
      {...props}
      color="white"
      borderRadius={16}
    >
      {props.title}
    </Tab>
  );
};

const Manage = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  console.log(search);

  return (
    <>
      <Main>
        <Box
          zIndex={100}
          position={"sticky"}
          top={0}
          pt={4}
          width={"100%"}
          bg={"dark"}
          pb={2.5}
        >
          <Flex>
            <SearchBar
              placeholder="Busca proyectos, nóminas, contratos..."
              onChange={handleSearch}
            />
            <Flex
              _hover={{ cursor: "pointer" }}
              bg="translucid"
              borderRadius={8}
              ml={2}
              alignItems="center"
              p="0px 16px"
            >
              <Text lineHeight={0} fontWeight="bold" fontSize="14px">
                Mis plantillas
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Tabs variant="soft-rounded" defaultIndex={1}>
          <TabList>
            <CustomTab title="Proyectos" mr={8} />
            <CustomTab title="Contratos" mr={8} />
            <CustomTab title="Nóminas" />
          </TabList>
          <Separator top="10px" bottom="10px" />
          <TabPanels p={0} m={0}>
            <TabPanel>
              <ManageProjects />
            </TabPanel>
            <TabPanel>
              <ManageContracts />
            </TabPanel>
            <TabPanel>
              <ManagePayrolls />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Main>
      <Side></Side>
    </>
  );
};

export default Manage;
