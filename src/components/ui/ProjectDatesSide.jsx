import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

// Redux
import { connect } from "react-redux";

// Lib
import moment from "moment";
import "moment/locale/es";

// Components
import plus from "../../assets/svg/plus.svg";
import Separator from "./Separator";

const ProjectDatesSide = ({ id, dates }) => (
  <Box>
    <Text fontSize={19} color={"primary"}>
      Duración,
    </Text>
    <Text fontSize={24} fontWeight={"bold"}>
      {dates.length === 1 ? "Un día" : `${dates.length} días`}
    </Text>
    <Separator top={2} bottom={4} />
    <Flex flexDirection={"column"}>
      {dates.map((date, index) => (
        <Text
          key={index}
          mb={2}
          p={2}
          borderRadius={10}
          border={"2px solid"}
          borderColor={"darkLight"}
        >
          {moment(date._seconds * 1000).format("D MMMM YYYY")}
        </Text>
      ))}
      <Flex
        w={"100%"}
        mt={1}
        py={1.5}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        borderRadius={8}
        _hover={{ bg: "darkLight" }}
        onClick={() => console.log("Añadiendo fecha")}
      >
        <Image src={plus} alt={"Añadir día"} mr={2} w={"12px"} />
        <Text fontSize={14} color={"primary"} lineHeight={1.6}>
          Añadir día
        </Text>
      </Flex>
    </Flex>
  </Box>
);

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(ProjectDatesSide);
