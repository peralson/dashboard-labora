import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Custom
// import useProject from "../hooks/useProject";

// SVG
import back from "../assets/svg/back.svg";
import edit from "../assets/svg/edit.svg";

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Side from "../components/main/Side";
import Documentation from "../components/main/Documentation";

const OneOffer = ({ match, history }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  //   const [project, setProject] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
  }, []);

  //   useEffect(() => {
  //     setError(null)
  //     setLoading(true)
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useProject(id)
  //       .then(res => setProject(res))
  //       .catch(err => setError(err.message))
  //       .finally(() => setLoading(false))
  //   }, [id])

  return (
    <>
      <Main>
        <TopMain>
          <Flex alignItems={"center"} justifyContent={"space-evenly"}>
            <Box maxW={"100%"}>
              <Flex
                justifyContent={"flex-end"}
                _hover={{ background: "translucid" }}
                px={2.5}
                py={2}
                borderRadius={10}
                cursor={"pointer"}
                onClick={() => history.goBack()}
              >
                <Image src={back} mr={2} w={"14px"} />
                <Text fontSize={16} color={"primary"}>
                  Volver
                </Text>
              </Flex>
            </Box>
            <Text
              flex={1}
              fontSize={19}
              lineHeight={2}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Proyecto {id}
            </Text>
            <Box maxW={"100%"}>
              <Flex
                justifyContent={"flex-end"}
                _hover={{ background: "translucid" }}
                px={2.5}
                py={2}
                borderRadius={10}
                cursor={"pointer"}
              >
                <Text fontSize={16} color={"primary"}>
                  Editar
                </Text>
                <Image src={edit} ml={2} w={"14px"} />
              </Flex>
            </Box>
          </Flex>
        </TopMain>
        {error && (
          <Text pt={8} textAlign={"center"}>
            Ha ocurrido algo
          </Text>
        )}
        {!loading && !error && null}
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
          {!loading && (
            <Box
              w={"100%"}
              py={3}
              px={4}
              bg={"darkLight"}
              borderRadius={10}
            ></Box>
          )}
        </Flex>
      </Side>
    </>
  );
};

export default OneOffer;
