import React from "react";
import { Box, Text, Grid } from "@chakra-ui/layout";

// Redux
import { connect } from "react-redux";

// Components
import ScheduleItem from "../../../../components/new/projectOffer/ScheduleItem";

const SchedulePicker = ({ projectId, projects }) => {
  const project = projects.find((p) => p.id === projectId);
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
      {project.projectData.dates.map((date, index) => (
        <ScheduleItem key={index} date={date} />
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

export default connect(mapStateToProps, null)(SchedulePicker);
