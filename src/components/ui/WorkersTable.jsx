import React from "react";
import { Box } from "@chakra-ui/layout";

import WorkerListItem from "./WorkerListItem";

const WorkersTable = ({ filteredWorkers, checkedItems, handleCheck }) => (
  <Box pb={4}>
    {filteredWorkers.map((worker) => (
      <WorkerListItem
        key={worker.id}
        worker={worker}
        checkedItems={checkedItems}
        handleCheck={handleCheck}
      />
    ))}
  </Box>
);

export default WorkersTable;
