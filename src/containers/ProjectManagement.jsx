import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

// Redux
import { connect } from 'react-redux'
import { fetchManagedProject } from '../store/actions/managedProject'

// Assets
import Logo from "../assets/img/Logo.png";

// Components
import TopMain from "../components/main/TopMain";

const ProjectManagement = ({ match, managedProject, fetchManagedProject }) => {
  const { id } = match.params;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setError(null);
      try {
        await fetchManagedProject(id);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
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
            onClick={() => window.location.reload()}
          >
            Recargar
          </Text>
        </Flex>
      </TopMain>
      <Box maxW={"480px"} w={"100%"} mx={"auto"} mt={6} px={4}>
        {loading && <Text>Cargando proyecto...</Text>}
        {error && <Text>Ha ocurrido un error</Text>}
        {!loading && !error && (
          <Box>
            {!!managedProject ? (
              <>
                <Text color={"primary"}>
                  Gestión laboral
                </Text>
                <Text fontWeight={"bold"} fontSize={21}>
                  {managedProject.projectData.name
                    ? managedProject.projectData.name
                    : managedProject.proyectOffers[0].offerData.name
                  }
                </Text>
              </>
            ) : (
              <>
                <Text>Este proyecto no tiene trabajos aún.</Text>
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    managedProject: state.managedProject.managedProject,
  };
};

const mapDispatchToProps = {
  fetchManagedProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagement);
