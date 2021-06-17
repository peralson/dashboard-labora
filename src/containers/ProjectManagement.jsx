import React, { useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

// Assets
import Logo from "../assets/img/Logo.png";

// Components
import TopMain from "../components/main/TopMain";
import useManagement from "../hooks/useManagement";

const ProjectManagement = ({ match }) => {
  const { id } = match.params;
  
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useManagement(id)
    .then(data => setProjectData(data))
    .catch(e => setError(e.message))
    .finally(() => setLoading(false))

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
            bg={"accent"}
            fontWeight={"bold"}
            py={2}
            px={3}
            fontSize={14}
            borderRadius={8}
            cursor={"pointer"}
            onClick={() => window.location.reload()}
          >
            Recargar
          </Text>
        </Flex>
      </TopMain>
      <Box maxW={"480px"} w={"100%"} mx={"auto"} mt={6} px={4}>
        <Text fontWeight={"bold"} fontSize={24}>
          Gestión laboral
        </Text>
        {loading && <Text>Cargando proyecto...</Text>}
        {error && <Text>Ha ocurrido un error: {error}</Text>}
        {!loading && !error && (
          <Box>
            <Text fontSize={19} color={"primary"}>
              Gestión laboral
            </Text>
            <Text fontWeight={"bold"} fontSize={24}>
              {projectData.projectData.name}
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProjectManagement;
