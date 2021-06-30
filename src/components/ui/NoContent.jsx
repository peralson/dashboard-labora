import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import NoWorkers from "../../assets/svg/NoWorkers.svg";
import AccentButton from "./AccentButton";
import { useHistory } from "react-router-dom";

const NoContent = ({ what, how, cta, url, otherComponent }) => {
  const history = useHistory();

  return (
    <Flex
      alignItems={"center"}
      flexDirection={"column"}
      py={12}
      maxW={"420px"}
      mx={"auto"}
    >
      <Image src={NoWorkers} alt={"Oh vaya!"} maxW={"180px"} />
      <Text mt={4} fontWeight={"bold"}>
        ¡Oh vaya! No hay {what}
      </Text>
      <Text mt={1} fontSize={14} textAlign={"center"}>
        {how}
      </Text>
      {cta && (
        <AccentButton py={5} px={6} mt={6} onClick={() => history.push(url)}>
          {cta}
        </AccentButton>
      )}
      {otherComponent}
    </Flex>
  );
};

export default NoContent;
