import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Grid } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Link } from "react-router-dom";

// Custom
import { formattedSalary } from "../lib/formattedSalary";
import useOffer from "../hooks/useOffer";

// Context
import { SelectedItemIndie } from "../context/SelectedItemContext";

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
import SideSticky from "../components/main/SideSticky";
import Documentation from "../components/main/Documentation";
import SideSelectorOffer from "../components/ui/SideSelectorOffer";
import OneOfferApplication from "../components/ui/OneOfferApplication";
import TextInfo from "../components/ui/TextInfo";
import ScheduleSide from "../components/ui/ScheduleSide";
import LegalSide from "../components/ui/LegalSide";
import BeCurious from "../components/ui/BeCurious";

const OneOffer = ({ match, history }) => {
  const { id } = match.params;

  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState(null);

  const [selectedItemIndie, setSelectedItemIndie] = useState(null);;

  useEffect(() => {
    setError(null);
    setLoading(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOffer(id)
      .then((res) => setOffer(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <SelectedItemIndie.Provider value={{ selectedItemIndie, setSelectedItemIndie }}>
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
            <Box flex="1">
              <Text
                fontSize={19}
                lineHeight={2}
                fontWeight={"bold"}
                textAlign={"center"}
              >
                {!loading
                  ? error
                    ? error
                    : offer.offerData.name
                  : "Cargando oferta..."}
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
        {!loading && !error && (
          <Box pb={10}>
            {offer.eventData.name && (
              <Flex mt={2} alignItems={"flex-end"} justifyContent={"flex-end"}>
                <Text fontSize={14} lineHeight={1.5}>
                  Esta oferta pertenece al proyecto:
                </Text>
                <Link to={`../../ofertas/p/${offer.offerData.id_event}`}>
                  <Text
                    color={"primary"}
                    ml={2}
                    fontSize={14}
                    lineHeight={1.35}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {offer.eventData.name}
                  </Text>
                </Link>
              </Flex>
            )}
            <Grid
              columnGap={8}
              width={"100%"}
              templateColumns={"3fr 1fr"}
              my={4}
            >
              <Box>
                <Grid gap={4} width={"100%"} templateColumns={"1fr 1fr"} mb={4}>
                  <TextInfo title="Nombre" info={offer.offerData.name} />
                  <TextInfo title="Categoría" info={offer.offerData.category} />
                  <TextInfo
                    title="Salario"
                    info={formattedSalary(offer.offerData.salary) + "€"}
                  />
                  <TextInfo
                    title="Horas extra"
                    info={formattedSalary(offer.offerData.extraSalary) + "€"}
                  />
                  <TextInfo title="Cantidad" info={offer.offerData.qty} />
                </Grid>
                <TextInfo
                  title="Requerimientos"
                  info={offer.offerData.description}
                  minH={"120px"}
                />
              </Box>
              <Box>
                <SideSelectorOffer
                  mb={4}
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
                <Grid
                  w={"100%"}
                  templateColumns={"1fr 1fr 1fr 1fr"}
                  columnGap={4}
                  rowGap={4}
                >
                  <OneOfferApplication name="Eloy Gómez" />
                  <OneOfferApplication name="Pablo Martino" />
                  <OneOfferApplication name="Vicente Roch" />
                  <OneOfferApplication name="Javier Fesser" />
                  <OneOfferApplication name="Pablo Peralta" />
                </Grid>
              </>
            )}
          </Box>
        )}
      </Main>
      <Side>
        <SideSticky>
          <Documentation />
          {!loading && (
            <Box w={"100%"} p={4} bg={"darkLight"} borderRadius={8}>
              {!selectedItemIndie && (
                <BeCurious
                  text={
                    "Selecciona alguna solicitud o característica de esta oferta"
                  }
                />
              )}
              {selectedItemIndie && selectedItemIndie === "Legal" && (
                <LegalSide
                  id={id}
                  salary={formattedSalary(offer.offerData.salary) + "€"}
                  extraSalary={
                    formattedSalary(offer.offerData.extraSalary) + "€"
                  }
                  extras={offer.offerData.extras}
                />
              )}
              {selectedItemIndie && selectedItemIndie === "Horario" && (
                <ScheduleSide schedules={offer.offerData.schedule} />
              )}
            </Box>
          )}
        </SideSticky>
      </Side>
    </SelectedItemIndie.Provider>
  );
};

export default OneOffer;
