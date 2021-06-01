import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Text, Input } from "@chakra-ui/react";

// Redux
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projects";

// Custom
import { NewProjectContext } from "../../context/newCreations";
import { initialState, reducer, validateForm } from "../../lib/newProjectState";

// svg
import plus from "../../assets/svg/plus.svg";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import Side from "../../components/main/Side";
import TopButton from "../../components/ui/TopButton";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import ProjectValidation from "../../components/new/ProjectValidation";

const NewProject = ({ history, createProject }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isValid = validateForm(state);

  return (
    <NewProjectContext.Provider value={{ state, dispatch }}>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <Link to={`../../`}>
                <TopButton danger onClick={() => {}}>
                  Cancelar
                </TopButton>
              </Link>
            }
            rightButton={
              <TopButton
                right
                inactive={!isValid}
                icon={plus}
                onSelect={() => {
                  if (isValid) {
                    createProject(state);
                    history.push("../../");
                  }
                }}
              >
                Crear
              </TopButton>
            }
          >
            Nuevo Proyecto
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} rowGap={4} mt={2}>
          <Box>
            <Text mb={2}>Nombre</Text>
            <Input
              value={state.name}
              placeholder={"Nombre del proyecto"}
              onChange={(e) =>
                dispatch({ type: "editName", payload: e.target.value })
              }
            />
          </Box>
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            <ProjectValidation />
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </NewProjectContext.Provider>
  );
};

const mapDispatchToProps = {
  createProject,
};

export default connect(null, mapDispatchToProps)(NewProject);
