import React, { useContext, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { NewProjectOfferContext } from "../../../context/newCreations";

import moment from "moment";
import "moment/locale/es";

// Components
import ShiftsPicker from "./ShiftsPicker";

const ScheduleItem = ({ date }) => {
  const { dispatch } = useContext(NewProjectOfferContext);
  const [pickedDate, setPickedDate] = useState(false);

  const handlePickDate = () => {
    if (pickedDate) {
      dispatch({ type: "removeDate", payload: date });
      setPickedDate(false);
    } else {
      dispatch({ type: "addDate", payload: date });
      setPickedDate(true);
    }
  };

  return (
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
        <Flex
          h={"20px"}
          w={"20px"}
          borderRadius={20}
          borderWidth={1}
          borderColor={"white"}
          bg={"dark"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          overflow={"hidden"}
          onClick={handlePickDate}
        >
          <Box
            h={"20px"}
            w={"20px"}
            borderRadius={20}
            bg={pickedDate && "primary"}
          ></Box>
        </Flex>
      </Flex>
      {pickedDate && <ShiftsPicker date={date} />}
    </Box>
  );
};

export default ScheduleItem;
