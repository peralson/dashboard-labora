import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

// Assets
import Logo from "../assets/img/Logo.png";

// Components
import TopMain from "../components/main/TopMain";

const ProjectManagement = ({ match, history }) => {
  const { id } = match.params;

  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://us-central1-partime-60670.cloudfunctions.net/api/job/checkStatus/${id}`,
      { headers: { "Content-Type": "application/json" } },
    )
      .then((blob) => blob.json())
      .then((data) => {
        if (data.error) {
          setError(data);
        } else {
          setProjectData(data.body);
        }
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(projectData);

  return (
    <>
      <TopMain pb={4}>
        <Flex justifyContent={"space-between"} alignItems={"center"} px={4}>
          <Image src={Logo} alt="Logo de Labora" w="120px" />
          <Text
            bg={"accent"}
            fontWeight={"bold"}
            py={2}
            px={3}
            fontSize={14}
            borderRadius={8}
            cursor={"pointer"}
            onClick={() => history.push(0)}
          >
            Recargar
          </Text>
        </Flex>
      </TopMain>
      <Box maxW={"480px"} w={"100%"} mx={"auto"} mt={6} px={4}>
        <Text fontWeight={"bold"} fontSize={24}>
          Gestión laboral
        </Text>
        {loading ? (
          <Text>Cargando proyecto...</Text>
        ) : error ? (
          <Text>Ha ocurrido un error</Text>
        ) : (
          <Flex>Todo correcto</Flex>
        )}
      </Box>
    </>
  );
};

export default ProjectManagement;
