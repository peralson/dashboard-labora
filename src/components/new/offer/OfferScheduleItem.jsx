import React from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";

import moment from "moment";
import "moment/locale/es";

// Components
import OfferShiftsPicker from "./OfferShiftsPicker";

const OfferScheduleItem = ({ date }) => (
  <Box
    py={3}
    px={4}
    borderWidth={2}
    borderColor={"darkLight"}
    borderRadius={20}
  >
    <Flex alignItems={"center"}>
      <Text fontSize={14} fontWeight={"bold"} flex={1} mr={2}>
        {moment(date._seconds * 1000).format("dddd, D MMMM YYYY")}
      </Text>
    </Flex>
    <OfferShiftsPicker date={date} />
  </Box>
);

export default OfferScheduleItem;
