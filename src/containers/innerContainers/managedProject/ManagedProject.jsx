import React, { useState } from "react";
import { Box, Text, Grid } from "@chakra-ui/react";

import { connect } from "react-redux";
import {
  handleChangeDate,
  handleChangeOffer,
} from "../../../store/actions/managedProject";

// Components
import SelectList from "../../../components/ui/SelectList";
import ActiveWorker from "../../../components/manageProject/ActiveWorker";
import InActiveWorker from "../../../components/manageProject/InActiveWorker";
import NoWorkers from "../../../components/manageProject/NoWorkers";

const getFilteredJobs = (jobs, pickedOffer, pickedDate) => {
  const filteredJobs = [];
  jobs.forEach((job) => {
    if (pickedOffer) {
      if (job.offer === pickedOffer && job.day === pickedDate) {
        filteredJobs.push(job);
      }
    } else {
      if (job.day === pickedDate) {
        filteredJobs.push(job);
      }
    }
  });
  return filteredJobs;
};

const getActiveInactiveJobs = (filteredJobs) => {
  return {
    activeJobs: filteredJobs.filter((job) => job.check_in.length !== 0) || [],
    inActiveJobs: filteredJobs.filter((job) => job.check_in.length === 0) || [],
  };
};

const ManagedProject = ({
  managedProject,
  offersArray,
  pickedOffer,
  datesArray,
  pickedDate,
  jobs,
  handleChangeDate,
  handleChangeOffer,
}) => {
  const [active, setActive] = useState(true);

  const filteredJobs = getFilteredJobs(jobs, pickedOffer, pickedDate);
  const { activeJobs, inActiveJobs } = getActiveInactiveJobs(filteredJobs);

  return (
    <Box>
      <Text color={"primary"}>Gestión laboral</Text>
      <Text fontWeight={"bold"} fontSize={21} mb={5}>
        {managedProject.projectData.name !== null
          ? managedProject.projectData.name
          : managedProject.proyectOffers[0].offerData.name}
      </Text>
      <Grid gap={2} w={"100%"}>
        {offersArray.length !== 1 && (
          <SelectList
            fontSize={14}
            color={"primary"}
            borderColor={"primary"}
            cursor={"pointer"}
            value={pickedOffer}
            placeholder={"Todas las ofertas"}
            _hover={{ borderColor: "primary" }}
            _focus={{ borderColor: "primary" }}
            values={offersArray}
            onChange={(e) => handleChangeOffer(e.target.value)}
          />
        )}
        {datesArray.length !== 1 && (
          <SelectList
            fontSize={14}
            color={"primary"}
            borderColor={"primary"}
            cursor={"pointer"}
            value={pickedDate}
            _hover={{ borderColor: "primary" }}
            _focus={{ borderColor: "primary" }}
            values={datesArray}
            onChange={(e) => handleChangeDate(e.target.value)}
          />
        )}
        <Box mt={4}>
          <Text fontWeight={"bold"} mb={2}>
            Trabajadores
          </Text>
          {filteredJobs !== 0 ? (
            <>
              <Grid templateColumns={"1fr 1fr"} gap={2} mb={4}>
                <Text
                  py={2}
                  textAlign={"center"}
                  borderRadius={10}
                  borderColor={active ? "primary" : "darkLight"}
                  color={active ? "primary" : "darkLight"}
                  cursor={"pointer"}
                  borderWidth={1}
                  fontSize={14}
                  onClick={() => setActive(true)}
                >
                  ACTIVOS
                </Text>
                <Text
                  py={2}
                  textAlign={"center"}
                  borderRadius={10}
                  borderColor={!active ? "primary" : "darkLight"}
                  color={!active ? "primary" : "darkLight"}
                  cursor={"pointer"}
                  borderWidth={1}
                  fontSize={14}
                  onClick={() => setActive(false)}
                >
                  POR LLEGAR
                </Text>
              </Grid>
              {active &&
                (activeJobs.length !== 0 ? (
                  activeJobs.map((job, index) => (
                    <ActiveWorker key={index} job={job} />
                  ))
                ) : (
                  <NoWorkers text={"No hay ningún trabajador activo"} />
                ))}
              {!active &&
                (inActiveJobs.length !== 0 ? (
                  inActiveJobs.map((job, index) => (
                    <InActiveWorker key={index} job={job} />
                  ))
                ) : (
                  <NoWorkers text={"No hay ningún trabajador por llegar"} />
                ))}
            </>
          ) : (
            <NoWorkers text={"No hay trabajadores para este día y oferta"} />
          )}
        </Box>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    managedProject: state.managedProject.managedProject,
    offersArray: state.managedProject.offersArray,
    pickedOffer: state.managedProject.pickedOffer,
    datesArray: state.managedProject.datesArray,
    pickedDate: state.managedProject.pickedDate,
    jobs: state.managedProject.jobs,
  };
};

const mapDispatchToProps = {
  handleChangeDate,
  handleChangeOffer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagedProject);
