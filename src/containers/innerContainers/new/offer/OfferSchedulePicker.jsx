import React, { useContext } from "react";
import { Box, Text, Grid } from "@chakra-ui/layout";

// Context
import { NewOfferContext } from "../../../../context/newCreations";

// Components
import OfferScheduleItem from "../../../../components/new/offer/OfferScheduleItem";

const OfferSchedulePicker = () => {
  const { state } = useContext(NewOfferContext);

  const sortedDates = state.projectData.dates.sort((a, b) => {
    if (a._seconds < b._seconds) {
      return -1;
    }
    if (a._seconds < b._seconds) {
      return 1;
    }
    return 0;
  });

  return (
    <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={2} my={6}>
      <Box mb={2}>
        <Text mb={2} fontWeight={"bold"}>
          Días y horarios *
        </Text>
        <Text color={"grey.dark"}>
          Selecciona los días de trabajo de esta oferta y atribuye un horario
          aproximado en cada día.
        </Text>
      </Box>
      {sortedDates.map((date, index) => (
        <OfferScheduleItem key={index} date={date} />
      ))}
    </Grid>
  );
};

export default OfferSchedulePicker;
