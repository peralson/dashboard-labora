import React from "react";
import { Flex, Box, Text } from "@chakra-ui/layout";

// Redux
import { connect } from "react-redux";

// Lib
import moment from "moment";
import "moment/locale/es";

const ProjectDatesSide = ({ dates }) => (
  <Box>
    <Text fontSize={19} color={"primary"}>
      Duración,
    </Text>
    <Text fontSize={24} fontWeight={"bold"} mb={4}>
      {dates.length === 1 ? "Un día" : `${dates.length} días`}
    </Text>
    <Flex flexDirection={"column"}>
      {dates.map((date, index) => (
        <Text
          key={index}
          mt={index !== 0 && 2}
          p={2}
          borderRadius={10}
          border={"2px solid"}
          borderColor={"darkLight"}
        >
          {moment(date._seconds * 1000).format("D MMMM YYYY")}
        </Text>
      ))}
    </Flex>
  </Box>
);

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(ProjectDatesSide);
