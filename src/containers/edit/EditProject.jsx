import React, { useState, useReducer } from "react";
import { Grid, Box, Flex, Image, Text, Input } from "@chakra-ui/react";

// Custom
import { connect } from "react-redux";
import { editProject } from '../../store/actions/projects'

// ENV & GMaps
import { firebaseConfig, LIBRARIES } from "../../env";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getLatLng,
  getGeocode,
} from "use-places-autocomplete";

// SVG
import back from "../../assets/svg/back.svg";
import edit from "../../assets/svg/edit.svg";
import cancel from "../../assets/svg/cancel.svg";
import correct from "../../assets/svg/correct.svg";

// Components
import Main from "../../components/main/Main";
import TopMain from "../../components/main/TopMain";
import Side from "../../components/main/Side";
import SideSticky from "../../components/main/SideSticky";
import SideBoxContainer from "../../components/ui/SideBoxContainer";
import NewTopHeaderBar from "../../components/new/NewTopHeaderBar";
import TopButton from "../../components/ui/TopButton";
import CustomInput from "../../components/new/CustomInput";
import Separator from "../../components/ui/Separator";
import ErrorMessage from "../../components/ui/ErrorMessage";

const PlacesAutoComplete = ({ state, dispatch }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data, status },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelectPlace = async (address) => {
    setValue(address, false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      dispatch({
        type: "setAddress",
        payload: { address: address, lat: lat, lng: lng },
      });
    } catch (error) {
      console.error("handleSelectPlace", error);
    } finally {
      clearSuggestions();
    }
  };

  return (
    <Box>
      <Text mb={2} fontWeight={"bold"}>
        Dirección *
      </Text>
      <Input
        py={2}
        px={3}
        borderRadius={8}
        borderWidth={2}
        borderColor={"darkLight"}
        placeholder={"Introduce la dirección del proyecto"}
        _active={{ borderColor: "white" }}
        _focus={{ borderColor: "white" }}
        value={value || state.location.address}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            dispatch({
              type: "setAddress",
              payload: { address: "", lat: null, lng: null },
            });
          }
        }}
        disabled={!ready}
      />
      {data.length > 0 && (
        <Box
          borderWidth={2}
          borderColor={"darkLight"}
          borderTopWidth={0}
          borderBottomRadius={10}
        >
          {status === "OK" &&
            data.map(({ description }, index) => (
              <Text
                key={index}
                p={2}
                borderBottomWidth={1}
                borderBottomColor={"translucid"}
                lineHeight={2}
                fontSize={14}
                color={"grey.dark"}
                _hover={{ bg: "translucid" }}
                cursor={"pointer"}
                onClick={() => handleSelectPlace(description)}
              >
                {description}
              </Text>
            ))}
        </Box>
      )}
    </Box>
  );
};

const formIsValid = (state) => {
  const hasName = state.name.length > 0;
  const isNameLong = state.name.length > 3;
  const hasAddress =
    state.location.address !== "" &&
    state.location.lat !== null &&
    state.location.lng !== null;

  return {
    isValid: hasName && hasAddress && isNameLong,
    hasName,
    isNameLong,
    hasAddress
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };

    case "setDesc":
      return { ...state, description: action.payload };

    case "setAddress":
      return { ...state, location: action.payload };

    default:
      return state;
  }
};

const EditProject = ({ match, history, projects, editProject }) => {
  const { id } = match.params;
  const project = projects.find((p) => p.id === id);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: firebaseConfig.apiKey,
    libraries: LIBRARIES,
  });

  const initialState = {
    name: project.projectData.name,
    description: project.projectData.description,
    location: project.projectData.location,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isValid, hasName, hasAddress, isNameLong } =
    formIsValid(state);

  const onSubmit = async () => {
    if (isValid) {
      setIsLoading(true);
      setError(null)
      try {
        await editProject(id, state, project.projectData.dates);
        history.push(`../../`);
      } catch (err) {
        setError(true)
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Main>
        <TopMain>
          <NewTopHeaderBar
            leftButton={
              <TopButton
                left
                icon={back}
                onSelect={() => history.push(`/ofertas/p/${id}`)}
              >
                Volver
              </TopButton>
            }
            rightButton={
              <TopButton
                right
                icon={edit}
                inactive={!isValid}
                onSelect={onSubmit}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </TopButton>
            }
          >
            {isLoading ? "Editando..." : "Editar proyecto"}
          </NewTopHeaderBar>
        </TopMain>
        <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
          {error && (
            <ErrorMessage
              title="Oh! Vaya... algo salió mal"
              secondary="Ha habido un problema editando el proyecto. Inténtalo más tarde."
              onClose={() => setError(null)}
            />
          )}
          <CustomInput
            title={"Nombre"}
            value={state.name}
            placeholder={"Nombre de la oferta"}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
          {!isLoaded ? (
            <Text>Cargando...</Text>
          ) : loadError ? (
            <Text>Ha ocurrido un error</Text>
          ) : (
            <PlacesAutoComplete state={state} dispatch={dispatch} />
          )}
          <CustomInput
            multiline
            optional
            title="Descripción"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "setDesc", payload: e.target.value })
            }
          />
        </Grid>
      </Main>
      <Side>
        <SideSticky>
          <SideBoxContainer>
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Nombre
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce un nombre
                </Text>
                <Image src={hasName ? correct : cancel} w={"12px"} />
              </Flex>
              <Flex
                mt={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Más de 3 caracteres
                </Text>
                <Image src={isNameLong ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
            <Separator top={4} bottom={4} />
            <Box>
              <Text fontWeight={"bold"} mb={2}>
                Dirección
              </Text>
              <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                <Text fontSize={14} lineHeight={1.6}>
                  Introduce una dirección válida
                </Text>
                <Image src={hasAddress ? correct : cancel} w={"12px"} />
              </Flex>
            </Box>
          </SideBoxContainer>
        </SideSticky>
      </Side>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatchToProps = {
  editProject
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
