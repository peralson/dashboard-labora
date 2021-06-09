import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { Grid, Text, Box } from "@chakra-ui/react";

// Redux
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projects";

// Custom
import { NewProjectContext } from "../../context/newCreations";
import {
  initialState,
  reducer,
  validateForm,
} from "../../lib/forms/newProjectState";

// SVG
import plus from "../../assets/svg/plus.svg";

// ENV & GMaps
import { firebaseConfig, LIBRARIES } from "../../env";
import { useLoadScript } from "@react-google-maps/api";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import CustomInput from "../../components/new/CustomInput";
import ProjectValidation from "../../components/new/project/ProjectValidation";
import PlacesAutocompleteInput from "../../components/new/PlacesAutocompleteInput";
import ProjectPickDates from "../../components/new/project/ProjectPickDates";

const NewProject = ({ history, createProject }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isValid } = validateForm(state);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: firebaseConfig.apiKey,
    libraries: LIBRARIES,
  });

  const handleCreateProject = async () => {
    setError(null)
    if (isValid) {
      setLoading(true)
      createProject(state)
        .then((id) => history.push(`../p/${id}`))
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }

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
              !loading ? (
                <TopButton
                  right
                  inactive={!isValid}
                  icon={plus}
                  onSelect={handleCreateProject}
                >
                  Crear
                </TopButton>
              ) : (
                <Text py={1} px={2} color={"primary"}>
                  Creando proyecto...
                </Text>
              )
            }
          >
            Nuevo Proyecto
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          {error && (
            <Box py={2} px={4} borderRadius={10} bg={"red.smooth"}>
              <Text fontWeight={"bold"} color={"red.full"} mb={2}>
                Oh! Vaya... algo salió mal
              </Text>
              <Text color={"red.full"}>Error: {error}</Text>
            </Box>
          )}
          <CustomInput
            title={"Nombre"}
            value={state.name}
            placeholder={"Introduce el nombre del proyecto"}
            onChange={(e) =>
              dispatch({ type: "editName", payload: e.target.value })
            }
          />
          {!isLoaded ? (
            <Text>Cargando...</Text>
          ) : loadError ? (
            <Text>Ha ocurrido un error</Text>
          ) : (
            <PlacesAutocompleteInput title={"Dirección"} />
          )}
          <CustomInput
            title={"Descripción"}
            optional
            multiline
            value={state.description}
            placeholder={"Describe de qué trata el proyecto"}
            onChange={(e) =>
              dispatch({ type: "editDescription", payload: e.target.value })
            }
          />
          <ProjectPickDates />
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
