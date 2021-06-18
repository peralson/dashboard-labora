import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

// SVG
import copy from "../../assets/svg/copy.svg";

const OpenManagementMini = ({ id }) => {
  const [display, setDisplay] = useState(false);
  return (
    <Flex
      alignItems="center"
      borderRadius={10}
      _hover={{ background: "darkLight" }}
      px={3}
      py={2}
      cursor={"pointer"}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
      as={"a"}
      href={`${window.location.origin}/gestion-de-proyecto/${id}`}
      target={"_blank"}
    >
      <Text fontSize={14} display={!display && "none"} lineHeight={1} mr={2}>
        Gestionar
      </Text>
      <Image src={copy} alt={"Opciones"} h={4} />
    </Flex>
  );
};

export default OpenManagementMini;
