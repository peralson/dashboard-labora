import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { NewProjectContext } from "../../context/newCreations";
import { validateForm } from "../../lib/newProjectState";

const ProjectValidation = () => {
  const { state } = useContext(NewProjectContext);
  const isValid = validateForm(state);
  return (
    <Box>
      <Text>100% completado</Text>
      {isValid ? <Text>Palante</Text> : <Text>Patras</Text>}
    </Box>
  );
};

export default ProjectValidation;
