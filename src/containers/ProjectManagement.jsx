import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

// Redux
import { connect } from 'react-redux'
import { fetchManagedProject } from '../store/actions/managedProject'

// Assets
import Logo from "../assets/img/Logo.png";

// Components
import TopMain from "../components/main/TopMain";
import ManagedProject from "./innerContainers/managedProject/ManagedProject";

const ProjectManagement = ({ match, fetchManagedProject }) => {
  const { id } = match.params;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadSite = () => {
    setError(null);
    setLoading(true);;
    fetchManagedProject(id)
      .catch(() => setError(true))
      .finally(() => setLoading(false));;
  };;

  useEffect(() => {
    fetchManagedProject(id)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopMain pb={4}>
        <Flex
          maxW={"800px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mx={"auto"}
          px={4}
        >
          <Image src={Logo} alt="Logo de Labora" w="120px" />
          <Text
            bg={"accentLight"}
            color={"accent"}
            px={3}
            py={2}
            fontSize={14}
            borderRadius={8}
            cursor={"pointer"}
            onClick={reloadSite}
          >
            Recargar
          </Text>
        </Flex>
      </TopMain>
      <Box maxW={"480px"} w={"100%"} mx={"auto"} mt={6} px={4}>
        {loading && <Text>Cargando proyecto...</Text>}
        {error && <Text>Ha ocurrido un error</Text>}
        {!loading && !error && <ManagedProject />}
      </Box>
    </>
  );
};

const mapDispatchToProps = {
  fetchManagedProject,
};

export default connect(null, mapDispatchToProps)(ProjectManagement);
