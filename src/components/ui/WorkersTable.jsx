import React from "react";
import { Grid } from "@chakra-ui/react";

import WorkerListItem from "./WorkerListItem";

const WorkersTable = ({ filteredWorkers, checkedItems, handleCheck }) => (
  <Grid templateColumns={"1fr 1fr 1fr"} gap={4} w={"100%"} my={4}>
    {filteredWorkers.map((worker) => (
      <WorkerListItem
        key={worker.id}
        worker={worker}
        checkedItems={checkedItems}
        handleCheck={() => handleCheck(worker)}
      />
    ))}
  </Grid>
);

export default WorkersTable;
