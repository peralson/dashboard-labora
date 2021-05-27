import React, { useState, useEffect, useContext } from "react";
import { Flex, Box, Text, Link, Grid } from "@chakra-ui/layout";
import { Image } from '@chakra-ui/image';
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";

// Custom
import { formattedSalary } from '../lib/formattedSalary'
import useOffer from '../hooks/useOffer'
import { SelectedItemIndie } from '../context/SelectedItemContext'

// SVG
import back from "../assets/svg/back.svg";
import edit from "../assets/svg/edit.svg";
import legal from "../assets/svg/legal.svg";
import schedule from "../assets/svg/schedule.svg";
import team from "../assets/svg/team.svg";

// Components
import Main from "../components/main/Main";
import TopMain from "../components/main/TopMain";
import Side from "../components/main/Side";
import Documentation from "../components/main/Documentation";
import SideSelectorOffer from "../components/ui/SideSelectorOffer";
import OneOfferApplication from "../components/ui/OneOfferApplication";

const OneOffer = ({ match, history }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true)
  const [offer, setOffer] = useState(null)
  const [error, setError] = useState(null)

  const { selectedItemIndie, setSelectedItemIndie } = useContext(SelectedItemIndie)
  
  useEffect(() => {
    setError(null)
		setLoading(true)
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useOffer(id)
      .then(res => setOffer(res))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

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
                <Image src={back} mr={2} w={'14px'} />
                <Text fontSize={16} color={"primary"}>Volver</Text>
              </Flex>
            </Box>
            <Box flex="1">
              <Text fontSize={19} lineHeight={2} fontWeight={"bold"} textAlign={"center"}>
                {!loading
                  ? error
                    ? error
                    : offer.offerData.name
                  : 'Cargando oferta...'}
              </Text>
            </Box>
            <Box maxW={"100%"}>
              <Flex
                justifyContent={"flex-end"}
                _hover={{ background: "translucid" }}
                px={2.5}
                py={2}
                borderRadius={10}
                cursor={"pointer"}
              >
                <Text fontSize={16} color={"primary"}>Editar</Text>
                <Image src={edit} ml={2} w={'14px'} />
              </Flex>
            </Box>
          </Flex>
        </TopMain>
        {error && <Text pt={8} textAlign={"center"}>Ha ocurrido algo</Text>}
        {!loading && !error && (
          <Box pb={10}>
            {offer.eventData.name && (
              <Text textAlign={"right"} fontSize={14} mt={2}>
                Esta oferta pertenece al proyecto: 
                <Link href={`/p/${offer.offerData.id_event}`} color={"primary"} ml={2}>
                  {offer.eventData.name}
                </Link>
              </Text>
            )}
            <Grid
              columnGap={8}
              width={"100%"}
              templateColumns={"3fr 1fr"}
              my={4}
            >
              <Box>
                <Grid
                  gap={4}
                  width={"100%"}
                  templateColumns={"1fr 1fr"}
                  mb={4}
                >
                  <Box>
                    <Text mb={2} fontSize={14} fontWeight={"bold"}>Nombre</Text>
                    <Input borderColor={"darkLight"} placeholder={offer.offerData.name} />
                  </Box>
                  <Box>
                    <Text mb={2} fontSize={14} fontWeight={"bold"}>Categoría</Text>
                    <Input borderColor={"darkLight"} placeholder={offer.offerData.category} />
                  </Box>
                  <Box>
                    <Text mb={2} fontSize={14} fontWeight={"bold"}>Salario</Text>
                    <Input borderColor={"darkLight"} placeholder={formattedSalary(offer.offerData.salary) + "€"} />
                  </Box>
                  <Box>
                    <Text mb={2} fontSize={14} fontWeight={"bold"}>Horas extra</Text>
                    <Input borderColor={"darkLight"} placeholder={formattedSalary(offer.offerData.extraSalary) + "€"} />
                  </Box>
                  <Box>
                    <Text mb={2} fontSize={14} fontWeight={"bold"}>Cantidad</Text>
                    <Input borderColor={"darkLight"} placeholder={offer.offerData.qty} />
                  </Box>
                </Grid>
                <Box>
                  <Text mb={2} fontSize={14} fontWeight={"bold"}>Requerimientos</Text>
                  <Textarea borderColor={"darkLight"} placeholder={offer.offerData.description} />
                </Box>
              </Box>
              <Box>
                <SideSelectorOffer
                  mb={3}
                  title={"Legal"}
                  desc={"Contrato, nóminas..."}
                  image={legal}
                />
                <SideSelectorOffer
                  mb={3}
                  title={"Horario"}
                  desc={"Horas totales, turnos..."}
                  image={schedule}
                />
                {offer.offerData.already_assigned >= 1 && (
                  <SideSelectorOffer
                    title={"Equipo"}
                    desc={
                      offer.offerData.already_assigned === 1
                        ? `${offer.offerData.already_assigned} persona`
                        : `${offer.offerData.already_assigned} personas`
                    }
                    image={team}
                  />
                )}
              </Box>
            </Grid>
            {offer.offerData.number_applies > 0 && (
              <>
                <Text fontSize={19} mb={2} fontWeight={"bold"} lineHeight={2}>
                  Solicitudes de esta oferta
                </Text>
                <Grid w={"100%"} templateColumns={"1fr 1fr 1fr 1fr"} columnGap={4} rowGap={4}>
                  <OneOfferApplication name="Eloy Gómez"/>
                  <OneOfferApplication name="Pablo Martino"/>
                  <OneOfferApplication name="Vicente Roch"/>
                  <OneOfferApplication name="Javier Fesser"/>
                  <OneOfferApplication name="Pablo Peralta"/>
                </Grid>
              </>
            )}
          </Box>
        )}
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
            <Box w={"100%"} py={3} px={4} bg={"darkLight"} borderRadius={10}>
              {!selectedItemIndie && <Text>Pick smt!</Text>}
              {selectedItemIndie && <Text>{selectedItemIndie} has been selected</Text>}
            </Box>
          )}
        </Flex>
      </Side>
    </>
  );
};

export default OneOffer;
