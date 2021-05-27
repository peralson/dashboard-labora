import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

// SVG
import Menu from "../../assets/svg/ellypsis-vertical.svg";

const Options = ({ children }) => {
  const [info, setInfo] = useState(false);
  return (
    <Flex
      alignItems="center"
      borderRadius={10}
      _hover={{ background: "translucid" }}
      onMouseEnter={() => setInfo(true)}
      onMouseLeave={() => setInfo(false)}
      px={3}
      py={2}
    >
      <Text fontSize={14} display={!info && "none"} lineHeight={1} mr={2}>
        {children}
      </Text>
      <Image src={Menu} alt={"Opciones"} h={3} />
    </Flex>
  );
};

export default Options;
